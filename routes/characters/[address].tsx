import { FreshContext } from "$fresh/server.ts";
import { Character } from "../../components/Character.tsx";
import { Killmails } from "../../components/Killmails.tsx";
import { characterService } from "../../utils/CharacterService.ts";
import { killmailService } from "../../utils/KillmailService.ts";

export default async function CharacterDetailsPage(
  _req: Request,
  ctx: FreshContext,
) {
  const character = await characterService.get(ctx.params.address);
  const killmails = await killmailService.findByCharacter(character.address);

  if (!character) {
    return ctx.renderNotFound();
  }

  return (
    <>
      <Character character={character} />

      <section class="flex flex-col gap-y-8 items-center">
        <Killmails killmails={killmails} />
      </section>
    </>
  );
}
