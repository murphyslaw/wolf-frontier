import { ISql } from "../db.ts";
import { Consumer } from "../QueueService.ts";
import { DB_Killmail } from "../types/DatabaseTypes.ts";
import { IKillmailsMessage } from "../types/MessageTypes.ts";
import { worldApiClient } from "../WorldApiClient.ts";

export class KillmailsMessageConsumer implements Consumer {
  static MESSAGE_TYPE: IKillmailsMessage["type"] = "Killmails";

  static createMessage(): IKillmailsMessage {
    return { type: this.MESSAGE_TYPE };
  }

  constructor(private db: ISql) {}

  public async consume(msg: unknown): Promise<boolean> {
    if (!this.isMessageType(msg)) return false;

    const response = await worldApiClient.killmails();

    if (!response) {
      // message was consumed
      return true;
    }

    for (const [id, data] of response.entries()) {
      const entry: DB_Killmail = {
        id: id,
        solar_system_id: Number(data.solar_system_id),
        victim: data.victim.address,
        killer: data.killer.address,
        loss_type: data.loss_type,
        timestamp: data.timestamp,
      };

      await this.db`
      INSERT INTO killmails ${this.db(entry)}
        ON CONFLICT (id) DO UPDATE
          SET solar_system_id = EXCLUDED.solar_system_id,
              victim = EXCLUDED.victim,
              killer = EXCLUDED.killer,
              timestamp = EXCLUDED.timestamp,
              loss_type = EXCLUDED.loss_type
      `;
    }

    return true;
  }

  private isMessageType(object: unknown): object is IKillmailsMessage {
    return (object as IKillmailsMessage)?.type !== undefined &&
      (object as IKillmailsMessage).type ===
        KillmailsMessageConsumer.MESSAGE_TYPE;
  }
}
