export interface ICharacterMessage {
  type: "Character";
  address: string;
}

export interface ISmartAssemblyMessage {
  type: "SmartAssembly";
  id: string;
}
