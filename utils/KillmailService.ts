import postgres from "https://deno.land/x/postgresjs@v3.4.5/mod.js";
import { ITopKills } from "../components/TopKills.tsx";
import { sql } from "./db.ts";

export interface IKillMail {
  id: number;
  victim: string;
  victim_name: string;
  killer: string;
  killer_name: string;
  solar_system_id: number;
  solar_system_name: string;
  loss_type: string;
  timestamp: number;
}

class KillmailService {
  constructor(private db: postgres.Sql) {}

  public async count(): Promise<number> {
    const [result] = await this.db`
      SELECT COUNT(*)
      FROM killmails
    ;`;

    return result.count;
  }

  public async get(id: string): Promise<IKillMail> {
    const [result] = await this
      .db<IKillMail[]>`
        SELECT
          km.id,
          km.victim,
          (SELECT sc.name FROM smartcharacters sc WHERE sc.address = km.victim) AS "victim_name",
          km.killer,
          (SELECT sc.name FROM smartcharacters sc WHERE sc.address = km.killer) AS "killer_name",
          km.solar_system_id,
          (SELECT ss.solar_system_name FROM solarsystems ss WHERE ss.id = km.solar_system_id) AS "solar_system_name",
          km.loss_type,
          km.timestamp
        FROM killmails km
        WHERE TRUE
        AND km.id = ${id}
      ;`;

    return result;
  }

  public async topCharacters(): Promise<ITopKills[]> {
    const result = await this
      .db<ITopKills[]>`
        SELECT
          ('/characters/' || km.killer) AS "href",
          (SELECT sc.name FROM smartcharacters sc WHERE sc.address = km.killer) AS "name",
          COUNT(*) AS "count"
        FROM killmails km
        GROUP BY
        	km.killer
        ORDER BY
        	count DESC,
        	name ASC
        LIMIT 10
      ;`;

    return result;
  }

  public async topTribes(): Promise<ITopKills[]> {
    const result = await this
      .db<ITopKills[]>`
        WITH
        killers AS (
          SELECT
            km.killer,
            COUNT(*)
          FROM killmails km
          GROUP BY
            km.killer
        )
        SELECT
          ('/tribes/' || t.id) AS "href",
          COALESCE(t.name, t.id::text) AS "name",
          SUM(k.count) AS "count"
        FROM tribes t
        JOIN smartcharacters sc ON sc.tribe_id = t.id
        JOIN killers k ON k.killer = sc.address
        GROUP BY
        	t.id,
        	t.name
        ORDER BY
        	count DESC,
        	t.name ASC
        LIMIT 10
      ;`;

    return result;
  }

  public async topSolarSystems(): Promise<ITopKills[]> {
    const result = await this
      .db<ITopKills[]>`
        SELECT
          ('/solarsystems/' || km.solar_system_id) AS "href",
          (SELECT ss.solar_system_name FROM solarsystems ss WHERE ss.id = km.solar_system_id) AS "name",
          COUNT(*) AS "count"
        FROM killmails km
        GROUP BY
        	km.solar_system_id
        ORDER BY
        	count DESC,
        	name ASC
        LIMIT 10
      ;`;

    return result;
  }

  public async findByTribe(tribeId: number): Promise<IKillMail[]> {
    const result = await this
      .db<IKillMail[]>`
        SELECT
          km.id,
          km.victim,
          (SELECT sc.name FROM smartcharacters sc WHERE sc.address = km.victim) AS "victim_name",
          km.killer,
          (SELECT sc.name FROM smartcharacters sc WHERE sc.address = km.killer) AS "killer_name",
          km.solar_system_id,
          (SELECT ss.solar_system_name FROM solarsystems ss WHERE ss.id = km.solar_system_id) AS "solar_system_name",
          km.loss_type,
          km.timestamp
        FROM killmails km
        JOIN smartcharacters sc ON sc.address = km.victim OR sc.address = km.killer
        JOIN tribes t ON t.id = sc.tribe_id
        WHERE TRUE
          AND sc.tribe_id = ${tribeId}
        ORDER BY
          km.timestamp DESC
        LIMIT 100
      ;`;

    return result;
  }

  public async findByCharacter(address: string): Promise<IKillMail[]> {
    const result = await this
      .db<IKillMail[]>`
        SELECT
          km.id,
          km.victim,
          (SELECT sc.name FROM smartcharacters sc WHERE sc.address = km.victim) AS "victim_name",
          km.killer,
          (SELECT sc.name FROM smartcharacters sc WHERE sc.address = km.killer) AS "killer_name",
          km.solar_system_id,
          (SELECT ss.solar_system_name FROM solarsystems ss WHERE ss.id = km.solar_system_id) AS "solar_system_name",
          km.loss_type,
          km.timestamp
        FROM killmails km
        JOIN smartcharacters sc ON sc.address = km.victim OR sc.address = km.killer
        WHERE TRUE
          AND sc.address = ${address}
        ORDER BY
          km.timestamp DESC
        LIMIT 100
      ;`;

    return result;
  }

  public async latest(): Promise<IKillMail[]> {
    const result = await this
      .db<IKillMail[]>`
        SELECT
          km.id,
          km.victim,
          (SELECT sc.name FROM smartcharacters sc WHERE sc.address = km.victim) AS "victim_name",
          km.killer,
          (SELECT sc.name FROM smartcharacters sc WHERE sc.address = km.killer) AS "killer_name",
          km.solar_system_id,
          (SELECT ss.solar_system_name FROM solarsystems ss WHERE ss.id = km.solar_system_id) AS "solar_sytem_name",
          km.loss_type,
          km.timestamp
        FROM killmails km
        ORDER BY
          km.timestamp DESC
        LIMIT 100
      ;`;

    return result;
  }

  public async findBySolarSystem(solarSystemId: number): Promise<IKillMail[]> {
    const result = await this
      .db<IKillMail[]>`
        SELECT
          km.id,
          km.victim,
          (SELECT sc.name FROM smartcharacters sc WHERE sc.address = km.victim) AS "victim_name",
          km.killer,
          (SELECT sc.name FROM smartcharacters sc WHERE sc.address = km.killer) AS "killer_name",
          km.solar_system_id,
          (SELECT ss.solar_system_name FROM solarsystems ss WHERE ss.id = km.solar_system_id) AS "solar_sytem_name",
          km.loss_type,
          km.timestamp
        FROM killmails km
        WHERE TRUE
          AND km.solar_system_id = ${solarSystemId}
        ORDER BY
          km.timestamp DESC
        LIMIT 100
      ;`;

    return result;
  }
}

export const killmailService = new KillmailService(sql);
