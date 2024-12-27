import { Partial } from "$fresh/runtime.ts";
import { FreshContext } from "$fresh/server.ts";
import { SolarSystem } from "../../components/SolarSystem.tsx";
import { Tabs } from "../../components/Tabs.tsx";
import { solarSystemService } from "../../utils/SolarSystemService.ts";

export default async function SolarSystemDetailsPage(
  _req: Request,
  ctx: FreshContext,
) {
  const solarSystemId = Number(ctx.params.id);
  const solarSystem = await solarSystemService.get(solarSystemId);

  if (!solarSystem) {
    return ctx.renderNotFound();
  }

  return (
    <>
      <SolarSystem solarSystem={solarSystem} />

      <div
        f-client-nav
      >
        <Partial name={`solarsystem-tab-content`}>
          <Tabs
            killmailsPath={`/partials/solarsystem-tabs/killmails/${solarSystem.id}`}
            smartAssembliesPath={`/partials/solarsystem-tabs/smartassemblies/${solarSystem.id}`}
            headquartersPath={`/partials/solarsystem-tabs/headquarters/${solarSystem.id}`}
            active="none"
          />
        </Partial>
      </div>
    </>
  );
}
