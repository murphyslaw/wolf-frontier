import { HealthMessageConsumer } from "./consumers/HealthMessageConsumer.ts";
import { IKv } from "./db.ts";
import { kv, QueueService, queueService } from "./QueueService.ts";
import { DB_Health } from "./types/DatabaseTypes.ts";

export class HealthService {
  static REFRESH_FREQUENCY = 60 * 1000; // milliseconds
  static STORE_KEY = ["health", "worldapi"];

  constructor(private db: IKv, private queue: QueueService) {
    this.queue.register(new HealthMessageConsumer(this));
  }

  public async online(): Promise<boolean> {
    const result = await this.db.get<DB_Health>(
      HealthService.STORE_KEY,
    );

    const value = result.value ? result.value : {
      online: false,
      updated_at: Date.now() - HealthService.REFRESH_FREQUENCY,
    };

    if (this.isStale(value)) {
      await queueService.enqueue(HealthMessageConsumer.createMessage());
    }

    return value.online;
  }

  public async upsert(online: boolean): Promise<void> {
    await this.db.set(HealthService.STORE_KEY, {
      online,
      updated_at: Date.now(),
    });
  }

  private isStale(value: DB_Health): boolean {
    return value.updated_at + HealthService.REFRESH_FREQUENCY <= Date.now();
  }
}

export const healthService = new HealthService(kv, queueService);
