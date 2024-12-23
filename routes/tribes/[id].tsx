import { FreshContext } from "$fresh/server.ts";
import { CharacterCompact } from "../../components/CharacterCompact.tsx";
import { Killmail } from "../../components/Killmail.tsx";
import { SmartAssembliesList } from "../../components/SmartAssembliesList.tsx";
import { characterService } from "../../utils/CharacterService.ts";
import { killmailService } from "../../utils/KillmailService.ts";
import { smartAssembliesService } from "../../utils/SmartAssembliesService.ts";
import { tribeService } from "../../utils/TribeService.ts";

export default async function TribeDetailsPage(
  _req: Request,
  ctx: FreshContext,
) {
  const tribeId = Number(ctx.params.id);
  const tribe = await tribeService.get(tribeId);

  if (!tribe) {
    return ctx.renderNotFound();
  }

  const members = await characterService.findByTribe(tribeId);
  const killmails = await killmailService.findByTribe(tribeId);
  const smartAssemblies = await smartAssembliesService.findByTribe(tribeId);

  const ceo = members.find((member) => member.address === tribe.ceo);
  const founder = members.find((member) => member.address === tribe.founder);

  return (
    <>
      <div class="flex flex-col gap-4 w-full">
        <div>
          <h2 class="headlineLarge">
            {tribe.name} [{tribe.ticker}]
          </h2>

          <label class="labelLarge text-grayLight">
            Member Count: {tribe.count}
          </label>
        </div>

        <div class="flex flex-wrap gap-4">
          {members.map((member) => (
            <CharacterCompact key={member.address} character={member} />
          ))}
        </div>

        <div class="grid grid-cols-2 w-2/3 mx-auto mt-8">
          <section class="flex flex-col gap-y-4">
            <h2 class="titleMedium">Info</h2>

            <ul class="bulletList bodyMedium">
              <li>
                ID: {tribe.id}
              </li>

              {founder && (
                <li>
                  FOUNDER:{" "}
                  <a href={`/characters/${founder.address}`}>{founder.name}</a>
                </li>
              )}

              {ceo && (
                <li>
                  CEO: <a href={`/characters/${ceo.address}`}>{ceo.name}</a>
                </li>
              )}

              {tribe.solar_system_name && (
                <li>
                  SOLAR SYSTEM:{" "}
                  <a
                    href={`/solarsystems/${tribe.solar_system_id}`}
                    class="bodyMedium"
                  >
                    {tribe.solar_system_name}
                  </a>
                </li>
              )}

              {tribe.url && (
                <li>
                  URL: <a href={tribe.url}>{tribe.url}</a>
                </li>
              )}
            </ul>
          </section>

          <section class="flex flex-col gap-y-4">
            <h2 class="titleMedium">
              Most recent kills ({killmails.length})
            </h2>

            <ol class="relative border-s border-neutral-700">
              {killmails.map((killmail) => (
                <Killmail key={killmail.id} killmail={killmail} />
              ))}
            </ol>
          </section>
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
      </div>
    </>
  );
}
