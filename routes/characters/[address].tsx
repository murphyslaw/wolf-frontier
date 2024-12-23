import { FreshContext } from "$fresh/server.ts";
import { Character } from "../../components/Character.tsx";
import { Killmails } from "../../components/Killmails.tsx";
import { SmartAssembliesList } from "../../components/SmartAssembliesList.tsx";
import { characterService } from "../../utils/CharacterService.ts";
import { killmailService } from "../../utils/KillmailService.ts";
import { smartAssembliesService } from "../../utils/SmartAssembliesService.ts";

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
  const smartAssemblies = await smartAssembliesService.findByCharacter(address);

  return (
    <>
      <Character character={character} />

      <section class="flex flex-col gap-y-8 items-center">
        <div class="flex flex-col gap-y-8">
          <h2 class="titleMedium">Most recent kills ({killmails.length})</h2>

          <Killmails killmails={killmails} />
        </div>
      </section>

      <SmartAssembliesList
        type="SmartStorageUnit"
        smartAssemblies={smartAssemblies.SmartStorageUnit}
        title="Smart Storage Units"
      />

      <SmartAssembliesList
        type="SmartTurret"
        smartAssemblies={smartAssemblies.SmartTurret}
        title="Smart Turrets"
      />

      <SmartAssembliesList
        type="SmartGate"
        smartAssemblies={smartAssemblies.SmartGate}
        title="Smart Gates"
      />
    </>
  );
}
