import { CharactersMessageConsumer } from "./consumers/CharactersMessageConsumer.ts";
import { KillmailsMessageConsumer } from "./consumers/KillmailsMessageConsumer.ts";
import { ISql, sql } from "./db.ts";
import { QueueService, queueService } from "./QueueService.ts";

class CronService {
  constructor(private queue: QueueService, private db: ISql) {
    this.queue.register(new KillmailsMessageConsumer(this.db));
    this.queue.register(new CharactersMessageConsumer(this.db));
  }

  public init(): void {
    Deno.cron("Sync Killmails", "0 * * * *", () => { // at minute 0
      this.queue.enqueue(KillmailsMessageConsumer.createMessage());
    });

    Deno.cron("Sync Characters", "0 3 * * *", () => { // at 03:00
      this.queue.enqueue(CharactersMessageConsumer.createMessage());
    });
  }
}

export const cronService = new CronService(queueService, sql);
