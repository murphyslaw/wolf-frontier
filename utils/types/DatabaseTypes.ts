export interface DB_SmartCharacter {
  smart_character_id: string;
  address: string;
  name: string;
  is_smart_character: boolean;
  created_at: number;
  eve_balance_wei: number;
  gas_balance_wei: number;
  image: string;
  tribe_id: number;
}

export interface DB_SmartAssembly {
  smart_assembly_id: string;
  item_id: string;
  chain_id: number;
  state_id: number;
  state: string;
  is_online: boolean;
  solar_system_id: number | null;
  region: string;
  name: string;
  owner_id: string;
  type_id: number;
  assembly_type: "SmartStorageUnit" | "SmartTurret" | "SmartGate";
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
  destination_gate: string | null;
}

export interface DB_Killmail {
  id: number;
  solar_system_id: number;
  loss_type: string;
  victim: string;
  killer: string;
  timestamp: number;
}

export interface DB_SolarSystem {
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

export interface DB_Health {
  online: boolean;
  updated_at: number;
}

export interface DB_Jumps {
  source: number;
  target: number;
  gate: boolean;
}

export interface DB_Type {
  id: number;
  name: string;
  description: string;
  smart_item_id: string;
  type_id: number;
  volume: number;
  mass: number;
  radius: number;
  portion_size: number;
  group_id: number;
  group_name: string;
  category_id: number;
  category_name: string;
  icon: string;
  image: string;
}
