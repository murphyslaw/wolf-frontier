import postgres from "https://deno.land/x/postgresjs@v3.4.5/mod.js";
import { sql } from "./db.ts";

export interface ISolarSystem {
  id: number;
  name: string;
  x: string;
  y: string;
  z: string;
}

class SolarSystemService {
  constructor(private db: postgres.Sql) {}

  public async count(): Promise<number> {
    const [result] = await this.db`
      SELECT COUNT(*)
      FROM solarsystems
    ;`;

    return result.count;
  }

  public async get(id: number): Promise<ISolarSystem> {
    const [result] = await this
      .db<ISolarSystem[]>`
        SELECT
          ss.id,
          ss.solar_system_name AS "name",
          ss.x,
          ss.y,
          ss.z
        FROM solarsystems ss
        WHERE TRUE
        AND ss.id = ${id}
      ;`;

    return result;
  }

  public async find(query: string | number): Promise<ISolarSystem[]> {
    const where = isNaN(Number(query))
      ? sql`AND LOWER(ss.solar_system_name) LIKE LOWER(${"%" + query + "%"})`
      : sql`AND ss.id = ${query}`;

    const results = await this
      .db<ISolarSystem[]>`
          SELECT
            ss.id,
            ss.solar_system_name AS "name",
            ss.x,
            ss.y,
            ss.z
          FROM solarsystems ss
          WHERE TRUE
            ${where}
          ORDER BY
            name ASC
        ;`;

    return results;
  }
}

export const solarSystemService = new SolarSystemService(sql);
