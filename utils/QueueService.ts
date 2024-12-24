export const kv = await Deno.openKv("./db/db.sqlite3");

export interface Consumer {
  consume(msg: unknown): Promise<boolean>;
}

export class QueueService {
  private consumers: Consumer[] = [];

  constructor(private queue: Deno.Kv) {}

  public register(consumer: Consumer) {
    this.consumers.push(consumer);

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
