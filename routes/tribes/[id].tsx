import { FreshContext } from "$fresh/server.ts";
import { Tribe } from "../../components/Tribe.tsx";
import { characterService } from "../../utils/CharacterService.ts";
import { tribeService } from "../../utils/TribeService.ts";

export default async function TribeDetailsPage(
  _req: Request,
  ctx: FreshContext,
) {
  const tribeId = Number(ctx.params.id);
  const tribe = await tribeService.get(tribeId);
  const members = await characterService.listByTribe(tribeId);

  if (!tribe) {
    return ctx.renderNotFound();
  }

  return <Tribe tribe={tribe} members={members} />;
}
