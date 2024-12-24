import postgres from "https://deno.land/x/postgresjs@v3.4.5/mod.js";
import { sql } from "./db.ts";
import { Consumer, QueueService, queueService } from "./QueueService.ts";
import { worldApiClient } from "./WorldApiClient.ts";

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
  image: string;
  assembly_type: "SmartStorageUnit" | "SmartTurret" | "SmartGate";
  is_valid: boolean;
  anchored_at_time: string;
  fuel_amount: number;
  fuel_consumption_per_min: number;
  fuel_max_capacity: number;
  fuel_unit_volume: number;
  updated_at: string;
}

export interface EF_SmartAssembly {
  id: string;
  itemId: string;
  chainId: number;
  stateId: number;
  state: string;
  isOnline: boolean;
  solarSystem: {
    solarSystemId: number;
    solarSystemName: string;
    location: {
      x: string;
      y: string;
      z: string;
    };
  };
  region: string;
  name: string;
  ownerId: string;
  ownerName: string;
  typeId: number;
  assemblyType: string;
  description: string;
  dappUrl: string;
  isValid: boolean;
  anchoredAtTime: string;
  location: {
    x: string;
    y: string;
    z: string;
  };
  floorPrice: string;
  fuel: {
    fuelAmount: number;
    fuelConsumptionPerMin: number;
    fuelMaxCapacity: number;
    fuelUnitVolume: number;
  };
  inventory?: {
    storageCapacity: string;
    usedCapacity: string;
    storageItems: string[];
    ephemeralInventoryList: string[];
  };
}

interface DB_SmartAssembly {
  smart_assembly_id: string;
  item_id: string;
  chain_id: number;
  state_id: number;
  state: string;
  is_online: boolean;
  solar_system_id: number;
  region: string;
  name: string;
  owner_id: string;
  type_id: number;
  assembly_type: string;
  description: string;
  dapp_url: string;
  is_valid: boolean;
  anchored_at_time: string;
  x: string;
  y: string;
  z: string;
  floor_price: string;
  fuel_amount: number;
  fuel_consumption_per_min: number;
  fuel_max_capacity: number;
  fuel_unit_volume: number;
  storage_capacity: string;
  used_capacity: string;
}

interface ISmartAssemblyMessage {
  type: "SmartAssembly";
  id: string;
}

export class SmartAssemblyMessageConsumer implements Consumer {
  constructor(private db: postgres.Sql) {}

  public async consume(msg: unknown): Promise<boolean> {
    if (!this.isMessageType(msg)) return false;

    const data = await worldApiClient.smartassembly(msg.id);

    if (!data) {
      // message was consumed
      return true;
    }

    const entry: DB_SmartAssembly = {
      smart_assembly_id: data.id,
      item_id: data.itemId,
      chain_id: data.chainId,
      state_id: data.stateId,
      state: data.state,
      is_online: data.isOnline,
      solar_system_id: data.solarSystem.solarSystemId,
      name: data.name,
      owner_id: data.ownerId,
      type_id: data.typeId,
      assembly_type: data.assemblyType,
      x: data.location.x,
      y: data.location.y,
      z: data.location.z,
      region: data.region,
      description: data.description,
      dapp_url: data.dappUrl,
      is_valid: data.isValid,
      anchored_at_time: data.anchoredAtTime,
      floor_price: data.floorPrice,
      fuel_amount: data.fuel.fuelAmount,
      fuel_consumption_per_min: data.fuel.fuelConsumptionPerMin,
      fuel_max_capacity: data.fuel.fuelMaxCapacity,
      fuel_unit_volume: data.fuel.fuelUnitVolume,
      storage_capacity: data.inventory?.storageCapacity || "",
      used_capacity: data.inventory?.usedCapacity || "",
    };

    await this.db`
      INSERT INTO smartassemblies ${sql(entry)}
      ON CONFLICT (smart_assembly_id) DO UPDATE
        SET state = EXCLUDED.state,
            is_online = EXCLUDED.is_online,
            state_id = EXCLUDED.state_id,
            solar_system_id = EXCLUDED.solar_system_id,
            name = EXCLUDED.name,
            owner_id = EXCLUDED.owner_id,
            type_id = EXCLUDED.type_id,
            assembly_type = EXCLUDED.assembly_type,
            x = EXCLUDED.x,
            y = EXCLUDED.y,
            z = EXCLUDED.z,
            region = EXCLUDED.region,
            description = EXCLUDED.description,
            dapp_url = EXCLUDED.dapp_url,
            is_valid = EXCLUDED.is_valid,
            anchored_at_time = EXCLUDED.anchored_at_time,
            floor_price = EXCLUDED.floor_price,
            fuel_amount = EXCLUDED.fuel_amount,
            fuel_consumption_per_min = EXCLUDED.fuel_consumption_per_min,
            fuel_max_capacity = EXCLUDED.fuel_max_capacity,
            fuel_unit_volume = EXCLUDED.fuel_unit_volume,
            storage_capacity = EXCLUDED.storage_capacity,
            used_capacity = EXCLUDED.used_capacity
    `;

    return true;
  }

  private isMessageType(object: unknown): object is ISmartAssemblyMessage {
    return (object as ISmartAssemblyMessage)?.type !== undefined &&
      (object as ISmartAssemblyMessage).type ===
        SmartAssembliesService.MESSAGE_TYPE;
  }
}

class SmartAssembliesService {
  static REFRESH_FREQUENCY = 5 * 60 * 1000; // milliseconds
  static MESSAGE_TYPE = "SmartAssembly";

  constructor(private db: postgres.Sql, private queue: QueueService) {
    this.queue.register(new SmartAssemblyMessageConsumer(db));
  }

  public async get(id: string): Promise<ISmartAssembly> {
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
          sa.updated_at
        FROM smartassemblies sa
        LEFT JOIN solarsystems ss ON ss.id = sa.solar_system_id
        LEFT JOIN types t ON t.id = sa.type_id
        LEFT JOIN smartcharacters sc ON sc.address = sa.owner_id
        WHERE TRUE
          AND sa.smart_assembly_id = ${id}
      ;`;

    this.cache([result]);

    return result;
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
          sa.updated_at
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
          sa.updated_at
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
          sa.updated_at
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

  private async cache(smartAssemblies: ISmartAssembly[]) {
    for (const smartAssembly of smartAssemblies) {
      if (this.isStale(smartAssembly)) {
        await this.queue.enqueue(
          {
            type: SmartAssembliesService.MESSAGE_TYPE,
            id: smartAssembly.smart_assembly_id,
          },
        );
      }
    }
  }

  private isStale(value: ISmartAssembly): boolean {
    return new Date(value.updated_at + "Z").getTime() +
        SmartAssembliesService.REFRESH_FREQUENCY < new Date().getTime();
  }
}

export const smartAssembliesService = new SmartAssembliesService(
  sql,
  queueService,
);
