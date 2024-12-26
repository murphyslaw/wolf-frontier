export interface ICharacterMessage {
  type: "Character";
  address: string;
}

export interface ICharactersMessage {
  type: "Characters";
}

export interface ISmartAssemblyMessage {
  type: "SmartAssembly";
  id: string;
}

export interface IKillmailsMessage {
  type: "Killmails";
}

export interface IHealthMessage {
  type: "Health";
}
