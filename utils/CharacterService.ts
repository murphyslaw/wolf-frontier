import { CharacterMessageConsumer } from "./consumers/CharacterMessageConsumer.ts";
import { ISql, sql } from "./db.ts";
import { QueueService, queueService } from "./QueueService.ts";

export interface ICharacter {
  address: string;
  name: string;
  eve_balance: number;
  image: string;
  tribe_id: number;
  tribe: string;
  ticker: string;
  updated_at: number;
  officer: boolean;
}

class CharacterService {
  static REFRESH_FREQUENCY = 10 * 60 * 1000; // milliseconds

  constructor(private db: ISql, private queue: QueueService) {
    this.queue.register(new CharacterMessageConsumer(db));
  }

  public async count(): Promise<number> {
    const [result] = await this.db`
      SELECT COUNT(*)
      FROM smartcharacters
    ;`;

    return result.count;
  }

  public async get(address: string): Promise<ICharacter | null> {
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
          sc.updated_at,
          (t.ceo = sc.address OR t.founder = sc.address) AS "officer"
        FROM smartcharacters sc
        LEFT JOIN tribes t ON t.id = sc.tribe_id
        WHERE TRUE
        AND sc.address = ${address}
      ;`;

    if (result) {
      this.cache([result]);
    }

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
          sc.updated_at,
          (t.ceo = sc.address OR t.founder = sc.address) AS "officer"
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
          sc.updated_at,
          (t.ceo = sc.address OR t.founder = sc.address) AS "officer"
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

  private async cache(characters: ICharacter[]) {
    for (const character of characters) {
      if (this.isStale(character)) {
        await this.queue.enqueue(
          CharacterMessageConsumer.createMessage(character.address),
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
