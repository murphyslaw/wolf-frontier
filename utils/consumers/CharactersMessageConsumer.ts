import { ISql } from "../db.ts";
import { Consumer } from "../QueueService.ts";
import { ICharactersMessage } from "../types/MessageTypes.ts";
import { worldApiClient } from "../WorldApiClient.ts";
import { CharacterMessageConsumer } from "./CharacterMessageConsumer.ts";

export class CharactersMessageConsumer implements Consumer {
  static MESSAGE_TYPE: ICharactersMessage["type"] = "Characters";

  static createMessage(): ICharactersMessage {
    return { type: this.MESSAGE_TYPE };
  }

  constructor(private db: ISql) {}

  public async consume(msg: unknown): Promise<boolean> {
    if (!this.isMessageType(msg)) return false;

    const data = await worldApiClient.smartcharacters();

    if (!data) {
      // message was consumed
      return true;
    }

    const characterMessageConsumer = new CharacterMessageConsumer(this.db);
    for (const dbCharacter of data) {
      characterMessageConsumer.consume(
        CharacterMessageConsumer.createMessage(dbCharacter.address),
      );
    }

    return true;
  }

  private isMessageType(object: unknown): object is ICharactersMessage {
    return (object as ICharactersMessage)?.type !== undefined &&
      (object as ICharactersMessage).type ===
        CharactersMessageConsumer.MESSAGE_TYPE;
  }
}
