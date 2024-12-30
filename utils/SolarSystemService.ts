import { ISql, sql } from "./db.ts";
import { DB_SolarSystem } from "./types/DatabaseTypes.ts";

export interface ISolarSystem {
  id: number;
  name: string;
  constellation: string | null;
  region: string | null;
  x: string | null;
  y: string | null;
  z: string | null;
}

export interface ISolarSystemLink {
  source: number;
  target: number;
  distance: number;
  smartGate: boolean;
}

class SolarSystemService {
  constructor(private db: ISql) {}

  public async count(): Promise<number> {
    const [result] = await this.db`
      SELECT COUNT(*)
      FROM solarsystems
    ;`;

    return result.count;
  }

  public async get(id: number): Promise<ISolarSystem> {
    const [result] = await this
      .db<DB_SolarSystem[]>`
        SELECT
          ss.id,
          ss.solar_system_name AS "name",
          ss.constellation,
          ss.region,
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
      .db<DB_SolarSystem[]>`
          SELECT
            ss.id,
            ss.solar_system_name AS "name",
            ss.constellation,
            ss.region,
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
