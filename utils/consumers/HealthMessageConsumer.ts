import { HealthService } from "../HealthService.ts";
import { Consumer } from "../QueueService.ts";
import { IHealthMessage } from "../types/MessageTypes.ts";
import { worldApiClient } from "../WorldApiClient.ts";

export class HealthMessageConsumer implements Consumer {
  static MESSAGE_TYPE: IHealthMessage["type"] = "Health";

  static createMessage(): IHealthMessage {
    return { type: this.MESSAGE_TYPE };
  }

  constructor(private healthService: HealthService) {}

  public async consume(msg: unknown): Promise<boolean> {
    if (!this.isMessageType(msg)) return false;

    const health = await worldApiClient.health();

    this.healthService.upsert(health);

    return true;
  }

  private isMessageType(object: unknown): object is IHealthMessage {
    return (object as IHealthMessage)?.type !== undefined &&
      (object as IHealthMessage).type === HealthMessageConsumer.MESSAGE_TYPE;
  }
}
