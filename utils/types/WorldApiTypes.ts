export interface EF_Health {
  ok: boolean;
}

export interface EF_SmartCharacter {
  id: string;
  address: string;
  name: string;
  isSmartCharacter: boolean;
  createdAt: number;
  eveBalanceWei: number;
  gasBalanceWei: number;
  image: string;
  corpId: number;
  smartAssemblies: EF_SmartAssembly[];
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

export interface EF_Killmail {
  solar_system_id: number;
  loss_type: string;
  victim: {
    address: string;
    name: string;
  };
  killer: {
    address: string;
    name: string;
  };
  timestamp: number;
}
