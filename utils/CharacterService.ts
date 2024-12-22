import postgres from "https://deno.land/x/postgresjs@v3.4.5/mod.js";
import { sql } from "./db.ts";

export interface ICharacter {
  address: string;
  name: string;
  eve_balance: number;
  image: string;
  tribe_id: number;
  tribe: string;
  ticker: string;
}

class CharacterService {
  constructor(private db: postgres.Sql) {}

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
          COALESCE(t.ticker, 'UNKNOWN') AS "ticker"
        FROM smartcharacters sc
        LEFT JOIN tribes t ON t.id = sc.tribe_id
        WHERE TRUE
        AND sc.address = ${address}
      ;`;

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
          COALESCE(t.ticker, 'UNKNOWN') AS "ticker"
        FROM smartcharacters sc
        LEFT JOIN tribes t ON t.id = sc.tribe_id
        WHERE TRUE
          AND sc.tribe_id = ${tribeId}
        ORDER BY
          sc.name ASC
      ;`;

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
          COALESCE(t.ticker, 'UNKNOWN') AS "ticker"
        FROM smartcharacters sc
        LEFT JOIN tribes t ON t.id = sc.tribe_id
        WHERE TRUE
        AND LOWER(sc.name) LIKE LOWER(${"%" + name + "%"})
        ORDER BY
          LOWER(sc.name) ASC
      ;`;

    return result;
  }

  public isOfficer(name: string) {
    return ["twisted", "zaroot", "dracula", "ukfatguy", "necstz", "murphyslaw"]
      .includes(
        name.toLowerCase(),
      );
  }
}

export const characterService = new CharacterService(sql);
