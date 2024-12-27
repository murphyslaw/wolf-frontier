import { Partial } from "$fresh/runtime.ts";
import { defineRoute, RouteConfig } from "$fresh/server.ts";
import { Killmails } from "../../../../components/Killmails.tsx";
import { Tabs } from "../../../../components/Tabs.tsx";
import { killmailService } from "../../../../utils/KillmailService.ts";

export const config: RouteConfig = {
  skipAppWrapper: true,
  skipInheritedLayouts: true,
};

export default defineRoute(async (_req, ctx) => {
  const id = Number(ctx.params.id);
  const killmails = await killmailService.findBySolarSystem(id);

  return (
    <Partial
      name={`solarsystem-tab-content`}
    >
      <Tabs
        killmailsPath={`/partials/solarsystem-tabs/killmails/${id}`}
        smartAssembliesPath={`/partials/solarsystem-tabs/smartassemblies/${id}`}
        headquartersPath={`/partials/solarsystem-tabs/headquarters/${id}`}
        active="killmails"
      />

      <Killmails killmails={killmails} />
    </Partial>
  );
});
