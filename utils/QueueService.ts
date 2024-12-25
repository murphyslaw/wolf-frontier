export const kv = await Deno.openKv("./db/db.sqlite3");

export interface Consumer {
  consume(msg: unknown): Promise<boolean>;
}

export class QueueService {
  private consumers: Consumer[] = [];

  constructor(private queue: Deno.Kv) {}

  public register(consumer: Consumer): void {
    this.consumers.push(consumer);

    // skip listening for new messages in build mode
    // workaround for long-running tasks during build
    // see https://github.com/denoland/fresh/issues/2240
    if (Deno.args.includes("build")) return;

    this.queue.listenQueue(async (msg: unknown) => {
      let consumed = false;

      console.log("QueueService", "incoming message", msg);

      for (const consumer of this.consumers) {
        consumed = await consumer.consume(msg);

        if (consumed) break;
      }

      if (!consumed) {
        console.error("QueueService", "unknown message received", msg);
      }
    });
  }

  public enqueue(value: unknown) {
    return this.queue.enqueue(value);
  }
}

export const queueService = new QueueService(kv);
