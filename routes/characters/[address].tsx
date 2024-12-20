import { FreshContext } from "$fresh/server.ts";
import { Character } from "../../components/Character.tsx";
import { characterService } from "../../utils/CharacterService.ts";

export default async function Characters(_req: Request, ctx: FreshContext) {
  const character = await characterService.get(ctx.params.address);

  if (!character) {
    return ctx.renderNotFound();
  }

  return <Character character={character} />;
}
