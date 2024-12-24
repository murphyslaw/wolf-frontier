import postgres from "https://deno.land/x/postgresjs@v3.4.5/mod.js";
import { sql } from "./db.ts";
import { Consumer, QueueService, queueService } from "./QueueService.ts";
import { EF_SmartAssembly } from "./SmartAssembliesService.ts";
import { worldApiClient } from "./WorldApiClient.ts";

export interface ICharacter {
  address: string;
  name: string;
  eve_balance: number;
  image: string;
  tribe_id: number;
  tribe: string;
  ticker: string;
  updated_at: number;
}

export interface EF_SmartCharacter {
  id: string;
  address: string;
  name: string;
  isSmartCharacter: boolean;
  createdAt: number;
  eveBalanceWei: number;
  gasBalanceWei: number;
  image: string;
  corpId: number;
  smartAssemblies: EF_SmartAssembly[];
}

interface DB_SmartCharacter {
  smart_character_id: string;
  address: string;
  name: string;
  is_smart_character: boolean;
  created_at: number;
  eve_balance_wei: number;
  gas_balance_wei: number;
  image: string;
  tribe_id: number;
}

interface ICharacterMessage {
  type: "Character";
  address: string;
}

export class CharacterMessageConsumer implements Consumer {
  constructor(private db: postgres.Sql) {}

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
      INSERT INTO smartcharacters ${sql(entry)}
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

class CharacterService {
  static REFRESH_FREQUENCY = 5 * 60 * 1000; // milliseconds
  static MESSAGE_TYPE = "Character";

  constructor(private db: postgres.Sql, private queue: QueueService) {
    this.queue.register(new CharacterMessageConsumer(db));
  }

  public async count(): Promise<number> {
    const [result] = await this.db`
      SELECT COUNT(*)
      FROM smartcharacters
    ;`;

    return result.count;
  }

  public async get(address: string): Promise<ICharacter> {
    const [result] = await this
      .db<ICharacter[]>`
        SELECT
          sc.address,
          sc.name,
          ROUND(sc.eve_balance_wei / 1000000000000000000.0, 2) AS "eve_balance",
          ROUND(sc.gas_balance_wei / 1000000000000000000.0, 2) AS "gas_balance",
          sc.image,
          sc.tribe_id,
          COALESCE(t.name, sc.tribe_id::text) AS "tribe",
          COALESCE(t.ticker, 'UNKNOWN') AS "ticker",
          sc.updated_at
        FROM smartcharacters sc
        LEFT JOIN tribes t ON t.id = sc.tribe_id
        WHERE TRUE
        AND sc.address = ${address}
      ;`;

    this.cache([result]);

    return result;
  }

  public async findByTribe(tribeId: number): Promise<ICharacter[]> {
    const result = await this
      .db<ICharacter[]>`
        SELECT
          sc.address,
          sc.name,
          ROUND(sc.eve_balance_wei / 1000000000000000000.0, 2) AS "eve_balance",
          ROUND(sc.gas_balance_wei / 1000000000000000000.0, 2) AS "gas_balance",
          sc.image,
          sc.tribe_id,
          COALESCE(t.name, sc.tribe_id::text) AS "tribe",
          COALESCE(t.ticker, 'UNKNOWN') AS "ticker",
          sc.updated_at
        FROM smartcharacters sc
        LEFT JOIN tribes t ON t.id = sc.tribe_id
        WHERE TRUE
          AND sc.tribe_id = ${tribeId}
        ORDER BY
          sc.name ASC
      ;`;

    this.cache(result);

    return result;
  }

  public async find(name: string): Promise<ICharacter[]> {
    const result = await this
      .db<ICharacter[]>`
        SELECT
          sc.address,
          sc.name,
          ROUND(sc.eve_balance_wei / 1000000000000000000.0, 2) AS "eve_balance",
          ROUND(sc.gas_balance_wei / 1000000000000000000.0, 2) AS "gas_balance",
          sc.image,
          sc.tribe_id,
          COALESCE(t.name, sc.tribe_id::text) AS "tribe",
          COALESCE(t.ticker, 'UNKNOWN') AS "ticker",
          sc.updated_at
        FROM smartcharacters sc
        LEFT JOIN tribes t ON t.id = sc.tribe_id
        WHERE TRUE
        AND LOWER(sc.name) LIKE LOWER(${"%" + name + "%"})
        ORDER BY
          LOWER(sc.name) ASC
      ;`;

    this.cache(result);

    return result;
  }

  public isOfficer(name: string) {
    return ["twisted", "zaroot", "dracula", "ukfatguy", "necstz", "murphyslaw"]
      .includes(
        name.toLowerCase(),
      );
  }

  private async cache(characters: ICharacter[]) {
    for (const character of characters) {
      if (this.isStale(character)) {
        await this.queue.enqueue(
          { type: CharacterService.MESSAGE_TYPE, address: character.address },
        );
      }
    }
  }

  private isStale(value: ICharacter): boolean {
    return new Date(value.updated_at + "Z").getTime() +
        CharacterService.REFRESH_FREQUENCY < new Date().getTime();
  }
}

export const characterService = new CharacterService(sql, queueService);
