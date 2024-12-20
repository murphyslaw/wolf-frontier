import { FreshContext } from "$fresh/server.ts";
import { Character } from "../../components/Character.tsx";
import { characterService } from "../../utils/CharacterService.ts";

export default async function Characters(_req, ctx: FreshContext) {
  const character = await characterService.get(ctx.params.address);

  return (
    <>
      <Character character={character} />
    </>
  );
}
