import { EF_SmartCharacter } from "./CharacterService.ts";
import { RequestService } from "./RequestService.ts";
import { EF_SmartAssembly } from "./SmartAssembliesService.ts";

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

  public async smartcharacter(
    address: string,
  ): Promise<EF_SmartCharacter | null> {
    try {
      const response = await this.get<EF_SmartCharacter>(
        `smartcharacters/${address}`,
      );

      return response.parsedBody || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  public async smartassembly(
    id: string,
  ): Promise<EF_SmartAssembly | null> {
    try {
      const response = await this.get<EF_SmartAssembly>(
        `smartassemblies/${id}`,
      );

      return response.parsedBody || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private get<T>(path: string) {
    return this.requestService.get<T>(`${this.ENDPOINT}/${path}`);
  }
}

export const worldApiClient = new WorldApiClient(new RequestService());
