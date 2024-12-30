import { ISql, sql } from "./db.ts";

interface DB_MapLinks {
  source: number;
  source_name: string;
  target: number;
  target_name: string;
  gate: boolean;
}

class MapService {
  constructor(private db: ISql) {}

  async gates() {
    const results = await this
      .db<DB_MapLinks[]>`
        WITH gates AS (
          SELECT
            sa.solar_system_id AS "source",
            target.solar_system_id AS "target",
            TRUE AS "gate"
          FROM smartassemblies sa
          LEFT JOIN smartassemblies target ON target.smart_assembly_id = sa.destination_gate
          WHERE TRUE
            AND sa.is_valid = TRUE
            AND sa.is_online = TRUE
            AND sa.assembly_type = 'SmartGate'
            AND sa.solar_system_id <> 0
            AND target.solar_system_id <> 0
            AND sa.destination_gate IS NOT NULL
        ), gate_systems AS (
          SELECT s.source AS "id" FROM gates s
          UNION
          SELECT s.target AS "id" FROM gates s
        ), static AS (
          SELECT
            j.source,
            j.target,
            j.gate
          FROM jumps j
          WHERE TRUE
            AND j.source IN (SELECT id FROM gate_systems)
            AND j.target IN (SELECT id FROM gate_systems)
        ), links AS (
          SELECT * FROM gates
          UNION
          SELECT * FROM static
        )
        SELECT
          sources.id AS "source",
          sources.solar_system_name AS "source_name",
          targets.id AS "target",
          targets.solar_system_name AS "target_name",
          l.gate
        FROM links l
        LEFT JOIN solarsystems sources ON sources.id = l.source
        LEFT JOIN solarsystems targets ON targets.id = l.target
        ORDER BY
          l.gate DESC
      ;`;

    return results;
  }
}

export const mapService = new MapService(sql);
