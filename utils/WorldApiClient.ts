import { RequestService } from "./RequestService.ts";

interface IHealthResponse {
  ok: boolean;
}

class WorldApiClient {
  private ENDPOINT =
    "https://blockchain-gateway-stillness.live.tech.evefrontier.com";

  constructor(private requestService: RequestService) {}

  public async health(): Promise<boolean> {
    try {
      const response = await this.get<IHealthResponse>("health");

      return response.status === 200 && Boolean(response.parsedBody?.ok);
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  private get<T>(path: string) {
    return this.requestService.get<T>(`${this.ENDPOINT}/${path}`);
  }
}

export const worldApiClient = new WorldApiClient(new RequestService());
