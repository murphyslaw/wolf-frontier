import { ISql } from "../db.ts";
import { Consumer } from "../QueueService.ts";
import { DB_SmartAssembly } from "../types/DatabaseTypes.ts";
import { ISmartAssemblyMessage } from "../types/MessageTypes.ts";
import { worldApiClient } from "../WorldApiClient.ts";

export class SmartAssemblyMessageConsumer implements Consumer {
  static MESSAGE_TYPE: ISmartAssemblyMessage["type"] = "SmartAssembly";

  static createMessage(id: string): ISmartAssemblyMessage {
    return {
      type: this.MESSAGE_TYPE,
      id,
    };
  }

  constructor(private db: ISql) {}

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
      destination_gate: data.gateLink?.destinationGate,
    };

    await this.db`
      INSERT INTO smartassemblies ${this.db(entry)}
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
            used_capacity = EXCLUDED.used_capacity,
            destination_gate = EXCLUDED.destination_gate
    `;

    return true;
  }

  private isMessageType(object: unknown): object is ISmartAssemblyMessage {
    return (object as ISmartAssemblyMessage)?.type !== undefined &&
      (object as ISmartAssemblyMessage).type ===
        SmartAssemblyMessageConsumer.MESSAGE_TYPE;
  }
}
