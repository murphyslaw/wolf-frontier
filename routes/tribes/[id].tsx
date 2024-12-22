import { FreshContext } from "$fresh/server.ts";
import { Killmails } from "../../components/Killmails.tsx";
import { Tribe } from "../../components/Tribe.tsx";
import { characterService } from "../../utils/CharacterService.ts";
import { killmailService } from "../../utils/KillmailService.ts";
import { tribeService } from "../../utils/TribeService.ts";

export default async function TribeDetailsPage(
  _req: Request,
  ctx: FreshContext,
) {
  const tribeId = Number(ctx.params.id);
  const tribe = await tribeService.get(tribeId);
  const members = await characterService.findByTribe(tribeId);
  const killmails = await killmailService.findByTribe(tribeId);

  if (!tribe) {
    return ctx.renderNotFound();
  }

  return (
    <>
      <Tribe tribe={tribe} members={members} />

      <section class="flex flex-col gap-y-8 items-center">
        <Killmails killmails={killmails} />
      </section>
    </>
  );
}
