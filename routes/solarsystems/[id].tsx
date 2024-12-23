import { FreshContext } from "$fresh/server.ts";
import { Killmails } from "../../components/Killmails.tsx";
import { SmartAssembliesList } from "../../components/SmartAssembliesList.tsx";
import { SolarSystem } from "../../components/SolarSystem.tsx";
import { TribeCompact } from "../../components/TribeCompact.tsx";
import { killmailService } from "../../utils/KillmailService.ts";
import { smartAssembliesService } from "../../utils/SmartAssembliesService.ts";
import { solarSystemService } from "../../utils/SolarSystemService.ts";
import { tribeService } from "../../utils/TribeService.ts";

export default async function SolarSystemDetailsPage(
  _req: Request,
  ctx: FreshContext,
) {
  const solarSystemId = Number(ctx.params.id);
  const solarSystem = await solarSystemService.get(solarSystemId);

  if (!solarSystem) {
    return ctx.renderNotFound();
  }

  const tribes = await tribeService.findByHeadquarters(solarSystemId);
  const killmails = await killmailService.findBySolarSystem(solarSystemId);
  const smartAssemblies = await smartAssembliesService.findBySolarSystem(
    solarSystemId,
  );

  return (
    <>
      <SolarSystem solarSystem={solarSystem} />

      <div class="grid grid-cols-2">
        <section class="flex flex-col gap-y-8">
          <h2 class="headlineLarge">Headquarters ({tribes.length})</h2>

          {tribes.map((tribe) => <TribeCompact key={tribe.id} tribe={tribe} />)}
        </section>

        <div class="flex flex-col gap-y-8">
          <h2 class="headlineLarge">Most recent kills ({killmails.length})</h2>

          <Killmails killmails={killmails} />
        </div>
      </div>

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
