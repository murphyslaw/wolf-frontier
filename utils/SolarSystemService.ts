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
  region_solar_system_count: number;
  constellation_solar_system_count: number;
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
        WITH
          regions AS (
            SELECT
              r.id,
              COUNT(r.id) AS "count"
            FROM
              regions r
              LEFT OUTER JOIN solarsystems ss ON ss.region = r.id
            GROUP BY
              r.id
          ),
          constellations AS (
            SELECT
              c.id,
              COUNT(c.id) AS "count"
            FROM
              constellations c
              LEFT OUTER JOIN solarsystems ss ON ss.constellation = c.id
            GROUP BY
              c.id
          )
        SELECT
          ss.id,
          ss.solar_system_name AS "name",
          ss.constellation,
          ss.region,
          ss.x,
          ss.y,
          ss.z,
          r.count AS "region_solar_system_count",
          c.count AS "constellation_solar_system_count"
        FROM
          solarsystems ss
        LEFT JOIN regions r ON r.id = ss.region
        LEFT JOIN constellations c ON c.id = ss.constellation
        WHERE TRUE
          AND ss.id = ${id}
      ;`;

    console.log(result);

    return result;
  }

  public async find(query: string | number): Promise<ISolarSystem[]> {
    const where = isNaN(Number(query))
      ? sql`AND LOWER(ss.solar_system_name) LIKE LOWER(${"%" + query + "%"})`
      : sql`AND ss.id = ${query}`;

    const results = await this
      .db<DB_SolarSystem[]>`
        WITH
          regions AS (
            SELECT
              r.id,
              COUNT(r.id) AS "count"
            FROM
              regions r
              LEFT OUTER JOIN solarsystems ss ON ss.region = r.id
            GROUP BY
              r.id
          ),
          constellations AS (
            SELECT
              c.id,
              COUNT(c.id) AS "count"
            FROM
              constellations c
              LEFT OUTER JOIN solarsystems ss ON ss.constellation = c.id
            GROUP BY
              c.id
          )
        SELECT
          ss.id,
          ss.solar_system_name AS "name",
          ss.constellation,
          ss.region,
          ss.x,
          ss.y,
          ss.z,
          r.count AS "region_solar_system_count",
          c.count AS "constellation_solar_system_count"
        FROM
          solarsystems ss
        LEFT JOIN regions r ON r.id = ss.region
        LEFT JOIN constellations c ON c.id = ss.constellation
        WHERE TRUE
          ${where}
        ORDER BY
          name ASC
      ;`;

    return results;
  }
}

export const solarSystemService = new SolarSystemService(sql);
