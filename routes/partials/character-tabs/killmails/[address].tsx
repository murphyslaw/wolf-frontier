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
  const address = ctx.params.address;
  const killmails = await killmailService.findByCharacter(address);

  return (
    <Partial
      name={`character-tab-content`}
    >
      <Tabs
        killmailsPath={`/partials/character-tabs/killmails/${address}`}
        smartAssembliesPath={`/partials/character-tabs/smartassemblies/${address}`}
        active="killmails"
      />

      <Killmails killmails={killmails} />
    </Partial>
  );
});
