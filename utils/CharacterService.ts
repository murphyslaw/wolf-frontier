import postgres from "https://deno.land/x/postgresjs@v3.4.5/mod.js";
import { sql } from "./db.ts";

export interface SmartCharacter {
  smart_character_id: string;
  address: string;
  name: string;
  is_smart_character: boolean;
  created_at: string;
  eve_balance_wei: string;
  gas_balance_wei: string;
  image: string;
  tribe_id: string;
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

  public async get(id: string): Promise<SmartCharacter> {
    console.log(id);
    const [result] = await this
      .db`
        SELECT
          sc.name,
          ROUND(sc.eve_balance_wei / 1000000000000000000.0, 2) AS "eve_balance",
          ROUND(sc.gas_balance_wei / 1000000000000000000.0, 2) AS "gas_balance",
          sc.image,
          t.name AS "tribe",
          t.ticker_name
        FROM smartcharacters sc
        JOIN tribes t ON t.id = sc.tribe_id
        WHERE TRUE
        AND address = '0xc1429630d07b8ebe7566386dd7cb1d7764a77596'
      ;`;

    console.log(result);

    return result as SmartCharacter;
  }
}

export const characterService = new CharacterService(sql);
