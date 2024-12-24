import { Consumer, kv, QueueService, queueService } from "./QueueService.ts";
import { worldApiClient } from "./WorldApiClient.ts";

interface IWorldApiHealth {
  online: boolean;
  updated_at: number;
}

interface IWorldApiHealthMessage {
  type: "WorldApiHealth";
}

class WorldApiMessageConsumer implements Consumer {
  constructor(private db: Deno.Kv) {}

  public async consume(msg: unknown): Promise<boolean> {
    if (!this.isMessageType(msg)) return false;

    const health = await worldApiClient.health();

    await this.db.set(WorldApiService.STORE_KEY, {
      online: health,
      updated_at: Date.now(),
    });

    return true;
  }

  private isMessageType(object: unknown): object is IWorldApiHealthMessage {
    return (object as IWorldApiHealthMessage)?.type !== undefined &&
      (object as IWorldApiHealthMessage).type === WorldApiService.MESSAGE_TYPE;
  }
}

class WorldApiService {
  static MESSAGE_TYPE = "WorldApiHealth";
  static REFRESH_FREQUENCY = 60 * 1000; // milliseconds
  static STORE_KEY = ["health", "worldapi"];

  constructor(private db: Deno.Kv, private queue: QueueService) {
    this.queue.register(new WorldApiMessageConsumer(db));
  }

  public async online(): Promise<boolean> {
    const result = await this.db.get<IWorldApiHealth>(
      WorldApiService.STORE_KEY,
    );

    const value = result.value ? result.value : {
      online: false,
      updated_at: Date.now() - WorldApiService.REFRESH_FREQUENCY,
    };

    if (this.isStale(value)) {
      await queueService.enqueue(
        { type: WorldApiService.MESSAGE_TYPE },
      );
    }

    return value.online;
  }

  private isStale(value: IWorldApiHealth): boolean {
    return value.updated_at + WorldApiService.REFRESH_FREQUENCY < Date.now();
  }
}

export const worldApiService = new WorldApiService(kv, queueService);
