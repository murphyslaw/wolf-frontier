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
