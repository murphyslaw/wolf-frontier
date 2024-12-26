import { CharacterService } from "../CharacterService.ts";
import { ISql } from "../db.ts";
import { Consumer } from "../QueueService.ts";
import { DB_SmartCharacter } from "../types/DatabaseTypes.ts";
import { ICharacterMessage } from "../types/MessageTypes.ts";
import { worldApiClient } from "../WorldApiClient.ts";

export class CharacterMessageConsumer implements Consumer {
  constructor(private db: ISql) {}

  public async consume(msg: unknown): Promise<boolean> {
    if (!this.isMessageType(msg)) return false;

    const data = await worldApiClient.smartcharacter(msg.address);

    if (!data) {
      // message was consumed
      return true;
    }

    const entry: DB_SmartCharacter = {
      smart_character_id: data.id,
      address: data.address,
      name: data.name,
      is_smart_character: data.isSmartCharacter,
      created_at: data.createdAt,
      eve_balance_wei: data.eveBalanceWei,
      gas_balance_wei: data.gasBalanceWei,
      image: data.image,
      tribe_id: data.corpId,
    };

    await this.db`
      INSERT INTO smartcharacters ${this.db(entry)}
      ON CONFLICT (address) DO UPDATE
      SET name = EXCLUDED.name,
          is_smart_character = EXCLUDED.is_smart_character,
          created_at = EXCLUDED.created_at,
          eve_balance_wei = EXCLUDED.eve_balance_wei,
          gas_balance_wei = EXCLUDED.gas_balance_wei,
          image = EXCLUDED.image,
          tribe_id = EXCLUDED.tribe_id
    `;

    return true;
  }

  private isMessageType(object: unknown): object is ICharacterMessage {
    return (object as ICharacterMessage)?.type !== undefined &&
      (object as ICharacterMessage).type === CharacterService.MESSAGE_TYPE;
  }
}
