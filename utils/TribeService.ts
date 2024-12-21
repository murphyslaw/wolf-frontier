import postgres from "https://deno.land/x/postgresjs@v3.4.5/mod.js";
import { sql } from "./db.ts";

export interface ITribe {
  id: number;
  name: string;
  ticker_name: string;
  url: string;
  ceo: string;
  founder: string;
  count: number;
}

class TribeService {
  constructor(private db: postgres.Sql) {}

  public async count(): Promise<number> {
    const [result] = await this.db`
      SELECT
        COUNT(DISTINCT tribe_id)
      FROM smartcharacters;
    ;`;

    return result.count;
  }

  public async get(id: number): Promise<ITribe> {
    const [result] = await this
      .db<ITribe[]>`
        SELECT
          t.id,
          t.name,
          t.ticker_name,
          t.url,
          t.ceo,
          t.founder,
          (
            SELECT
              COUNT(*) AS "count"
            FROM smartcharacters sc
            WHERE TRUE
              AND sc.tribe_id = t.id
          ) AS "count"
        FROM tribes t
        WHERE TRUE
          AND t.id = ${id}
      ;`;

    return result;
  }

  public async find(name: string | number): Promise<ITribe[]> {
    const where = isNaN(Number(name))
      ? sql`AND LOWER(t.name) LIKE LOWER(${"%" + name + "%"})`
      : sql`AND t.id = ${name}`;

    const results = await this
      .db<ITribe[]>`
        WITH
        members_view AS (
          SELECT
            sc.tribe_id,
            COUNT(*) AS "count"
          FROM smartcharacters sc
          GROUP BY
            sc.tribe_id
        )

        SELECT
          t.*,
          mv.count
        FROM tribes t
        JOIN members_view mv ON mv.tribe_id = t.id
        WHERE TRUE
          ${where}
      ;`;

    return results;
  }
}

export const tribeService = new TribeService(sql);
