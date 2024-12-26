import { KillmailsMessageConsumer } from "./consumers/KillmailsMessageConsumer.ts";
import { ISql, sql } from "./db.ts";
import { QueueService, queueService } from "./QueueService.ts";

class CronService {
  constructor(private queue: QueueService, private db: ISql) {
    this.queue.register(new KillmailsMessageConsumer(this.db));
  }

  public init(): void {
    Deno.cron("Sync Killmails", { hour: { every: 1 } }, () => {
      this.queue.enqueue(KillmailsMessageConsumer.createMessage());
    });
  }
}

export const cronService = new CronService(queueService, sql);
