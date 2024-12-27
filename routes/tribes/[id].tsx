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
      <div class="flex flex-col gap-8 w-full">
        <div class="flex flex-row gap-4">
          <div class="bordered p-2">
            <img
              src={`/images/tribes/${tribe.id % 10}.png`}
              width="124px"
              height="124px"
            />
          </div>

          <div class="flex flex-col gap-4">
            <div class="flex flex-col gap-0">
              <div class="w-full flex flex-row items-center justify-between">
                <label class="labelLarge text-grayLight">
                  Tribe
                </label>
              </div>

              <h2 class="headlineLarge">
                {tribe.name} [{tribe.ticker}]
              </h2>
            </div>

            <ul class="bulletList bodyMedium">
              <li>
                ID: {tribe.id}
              </li>

              <li>
                MEMBER: {tribe.count}
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
                  HEADQUARTERS:{" "}
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
          </div>
        </div>

        <div class="flex flex-wrap gap-4">
          {members.map((member) => (
            <CharacterCompact key={member.address} character={member} />
          ))}
        </div>

        <div class="grid grid-cols-2 w-2/3 mx-auto mt-8">
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
