import { FreshContext } from "$fresh/server.ts";
import { Character } from "../../components/Character.tsx";
import { Killmails } from "../../components/Killmails.tsx";
import { characterService } from "../../utils/CharacterService.ts";
import { killmailService } from "../../utils/KillmailService.ts";

export default async function CharacterDetailsPage(
  _req: Request,
  ctx: FreshContext,
) {
  const address = ctx.params.address;
  const character = await characterService.get(address);

  if (!character) {
    return ctx.renderNotFound();
  }

  const killmails = await killmailService.findByCharacter(address);

  return (
    <>
      <Character character={character} />

      <section class="flex flex-col gap-y-8 items-center">
        <Killmails killmails={killmails} />
      </section>
    </>
  );
}
