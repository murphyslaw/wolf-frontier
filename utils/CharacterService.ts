import postgres from "https://deno.land/x/postgresjs@v3.4.5/mod.js";
import { sql } from "./db.ts";

class CharacterService {
  constructor(private db: postgres.Sql) {}

  public async count(): Promise<number> {
    const [result] = await this.db`SELECT COUNT(*) FROM smartcharacters;`;

    return result.count;
  }
}

export const characterService = new CharacterService(sql);
