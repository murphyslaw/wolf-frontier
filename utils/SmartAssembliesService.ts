import { SmartAssemblyMessageConsumer } from "./consumers/SmartAssemblyMessageConsumer.ts";
import { ISql, sql } from "./db.ts";
import { QueueService, queueService } from "./QueueService.ts";

export interface ISmartAssembly {
  smart_assembly_id: string;
  item_id: string;
  is_online: boolean;
  solar_system_id: number;
  solar_system_name: string;
  name: string;
  description: string;
  owner_id: string;
  owner_name: string;
  type_id: number;
  assembly_type: "SmartStorageUnit" | "SmartTurret" | "SmartGate";
  is_valid: boolean;
  anchored_at_time: string;
  fuel_amount: number;
  fuel_consumption_per_min: number;
  fuel_max_capacity: number;
  fuel_unit_volume: number;
  updated_at: string;
  destination_gate: string | null;
}

class SmartAssembliesService {
  static REFRESH_FREQUENCY = 60 * 60 * 1000; // milliseconds

  constructor(private db: ISql, private queue: QueueService) {
    this.queue.register(new SmartAssemblyMessageConsumer(db));
  }

  public async get(
    id: string | null,
  ): Promise<ISmartAssembly | null> {
    if (!id) return null;

    const [result] = await this
      .db<ISmartAssembly[]>`
        SELECT
          sa.smart_assembly_id,
          sa.item_id,
          sa.is_online,
          sa.solar_system_id,
          COALESCE(ss.solar_system_name, ss.id::text) AS "solar_system_name",
          sa.name,
          sa.description,
          sa.owner_id,
          COALESCE(sc.name, sa.owner_id::text) AS "owner_name",
          sa.type_id,
          t.image,
          sa.assembly_type,
          sa.is_valid,
          sa.anchored_at_time,
          ROUND(sa.fuel_amount / 1000000000000000000) AS "fuel_amount",
          sa.fuel_consumption_per_min,
          ROUND(sa.fuel_max_capacity / 10000000000000000) AS "fuel_max_capacity",
          sa.fuel_unit_volume,
          sa.updated_at,
          sa.destination_gate
        FROM smartassemblies sa
        LEFT JOIN solarsystems ss ON ss.id = sa.solar_system_id
        LEFT JOIN types t ON t.id = sa.type_id
        LEFT JOIN smartcharacters sc ON sc.address = sa.owner_id
        WHERE TRUE
          AND sa.smart_assembly_id = ${id}
      ;`;

    if (result) {
      this.cache([result]);

      return result;
    }

    return null;
  }

  public async findByCharacter(
    address: string,
  ): Promise<Partial<Record<string, ISmartAssembly[]>>> {
    const result = await this
      .db<ISmartAssembly[]>`
        SELECT
          sa.smart_assembly_id,
          sa.item_id,
          sa.is_online,
          sa.solar_system_id,
          COALESCE(ss.solar_system_name, ss.id::text) AS "solar_system_name",
          sa.name,
          sa.description,
          sa.owner_id,
          COALESCE(sc.name, sa.owner_id::text) AS "owner_name",
          sa.type_id,
          t.image,
          sa.assembly_type,
          sa.is_valid,
          sa.anchored_at_time,
          ROUND(sa.fuel_amount / 1000000000000000000) AS "fuel_amount",
          sa.fuel_consumption_per_min,
          ROUND(sa.fuel_max_capacity / 10000000000000000) AS "fuel_max_capacity",
          sa.fuel_unit_volume,
          sa.updated_at,
          sa.destination_gate
        FROM smartassemblies sa
        LEFT JOIN solarsystems ss ON ss.id = sa.solar_system_id
        LEFT JOIN types t ON t.id = sa.type_id
        LEFT JOIN smartcharacters sc ON sc.address = sa.owner_id
        WHERE TRUE
          AND sa.owner_id = ${address}
        ORDER BY
          sa.is_online DESC,
          sa.fuel_amount DESC,
          sa.anchored_at_time DESC
      ;`;

    this.cache(result);

    return Object.groupBy(result, ({ assembly_type }) => assembly_type);
  }

  public async findByTribe(
    tribeId: number,
  ): Promise<Partial<Record<string, ISmartAssembly[]>>> {
    const result = await this
      .db<ISmartAssembly[]>`
        SELECT
          sa.smart_assembly_id,
          sa.item_id,
          sa.is_online,
          sa.solar_system_id,
          COALESCE(ss.solar_system_name, ss.id::text) AS "solar_system_name",
          sa.name,
          sa.description,
          sa.owner_id,
          COALESCE(sc.name, sa.owner_id::text) AS "owner_name",
          sa.type_id,
          t.image,
          sa.assembly_type,
          sa.is_valid,
          sa.anchored_at_time,
          ROUND(sa.fuel_amount / 1000000000000000000) AS "fuel_amount",
          sa.fuel_consumption_per_min,
          ROUND(sa.fuel_max_capacity / 10000000000000000) AS "fuel_max_capacity",
          sa.fuel_unit_volume,
          sa.updated_at,
          sa.destination_gate
        FROM smartassemblies sa
        JOIN smartcharacters sc ON sc.address = sa.owner_id
        LEFT JOIN solarsystems ss ON ss.id = sa.solar_system_id
        LEFT JOIN types t ON t.id = sa.type_id
        JOIN tribes tr ON tr.id = sc.tribe_id
        WHERE TRUE
          AND sc.tribe_id = ${tribeId}
        ORDER BY
          sa.is_online DESC,
          sa.fuel_amount DESC,
          sa.anchored_at_time DESC
      ;`;

    this.cache(result);

    return Object.groupBy(result, ({ assembly_type }) => assembly_type);
  }

  public async findBySolarSystem(
    solarSystemId: number,
  ): Promise<Partial<Record<string, ISmartAssembly[]>>> {
    const result = await this
      .db<ISmartAssembly[]>`
        SELECT
          sa.smart_assembly_id,
          sa.item_id,
          sa.is_online,
          sa.solar_system_id,
          COALESCE(ss.solar_system_name, ss.id::text) AS "solar_system_name",
          sa.name,
          sa.description,
          sa.owner_id,
          COALESCE(sc.name, sa.owner_id::text) AS "owner_name",
          sa.type_id,
          t.image,
          sa.assembly_type,
          sa.is_valid,
          sa.anchored_at_time,
          ROUND(sa.fuel_amount / 1000000000000000000) AS "fuel_amount",
          sa.fuel_consumption_per_min,
          ROUND(sa.fuel_max_capacity / 10000000000000000) AS "fuel_max_capacity",
          sa.fuel_unit_volume,
          sa.updated_at,
          sa.destination_gate
        FROM smartassemblies sa
        JOIN solarsystems ss ON ss.id = sa.solar_system_id
        LEFT JOIN types t ON t.id = sa.type_id
        LEFT JOIN smartcharacters sc ON sc.address = sa.owner_id
        WHERE TRUE
          AND sa.solar_system_id = ${solarSystemId}
        ORDER BY
          sa.is_online DESC,
          sa.fuel_amount DESC,
          sa.anchored_at_time DESC
      ;`;

    this.cache(result);

    return Object.groupBy(result, ({ assembly_type }) => assembly_type);
  }

  private async cache(
    smartAssemblies: Pick<
      ISmartAssembly,
      "updated_at" | "smart_assembly_id"
    >[],
  ) {
    for (const smartAssembly of smartAssemblies) {
      if (this.isStale(smartAssembly.updated_at)) {
        await this.queue.enqueue(
          SmartAssemblyMessageConsumer.createMessage(
            smartAssembly.smart_assembly_id,
          ),
        );
      }
    }
  }

  private isStale(value: string): boolean {
    return new Date(value + "Z").getTime() +
        SmartAssembliesService.REFRESH_FREQUENCY < new Date().getTime();
  }
}

export const smartAssembliesService = new SmartAssembliesService(
  sql,
  queueService,
);
