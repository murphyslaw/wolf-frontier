import postgres from "https://deno.land/x/postgresjs@v3.4.5/mod.js";
import { sql } from "./db.ts";

export interface SmartCharacter {
  address: string;
  name: string;
  eve_balance: number;
  image: string;
  tribe: string;
  ticker_name: string;
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

  public async get(address: string): Promise<SmartCharacter> {
    const [result] = await this
      .db`
        SELECT
          sc.address,
          sc.name,
          ROUND(sc.eve_balance_wei / 1000000000000000000.0, 2) AS "eve_balance",
          ROUND(sc.gas_balance_wei / 1000000000000000000.0, 2) AS "gas_balance",
          sc.image,
          t.name AS "tribe",
          t.ticker_name
        FROM smartcharacters sc
        JOIN tribes t ON t.id = sc.tribe_id
        WHERE TRUE
        AND address = ${address}
      ;`;

    return result as SmartCharacter;
  }

  public async listByTribe(tribeId: number): Promise<SmartCharacter[]> {
    const result = await this
      .db`
        SELECT
          sc.address,
          sc.name,
          ROUND(sc.eve_balance_wei / 1000000000000000000.0, 2) AS "eve_balance",
          ROUND(sc.gas_balance_wei / 1000000000000000000.0, 2) AS "gas_balance",
          sc.image,
          t.name AS "tribe",
          t.ticker_name
        FROM smartcharacters sc
        JOIN tribes t ON t.id = sc.tribe_id
        WHERE TRUE
        AND tribe_id = ${tribeId}
      ;`;

    return result as unknown as SmartCharacter[];
  }

  public isOfficer(name: string) {
    return ["twisted", "zaroot", "dracula", "ukfatguy", "necstz", "murphyslaw"]
      .includes(
        name.toLowerCase(),
      );
  }
}

export const characterService = new CharacterService(sql);
