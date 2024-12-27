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
  const killmails = await killmailService.findByTribe(id);

  return (
    <Partial
      name={`tribe-tab-content`}
    >
      <Tabs
        killmailsPath={`/partials/tribe-tabs/killmails/${id}`}
        smartAssembliesPath={`/partials/tribe-tabs/smartassemblies/${id}`}
        active="killmails"
      />

      <Killmails killmails={killmails} />
    </Partial>
  );
});
