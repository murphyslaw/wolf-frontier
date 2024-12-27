import { Partial } from "$fresh/runtime.ts";
import { defineRoute, RouteConfig } from "$fresh/server.ts";
import { SmartAssembliesList } from "../../../../components/SmartAssembliesList.tsx";
import { Tabs } from "../../../../components/Tabs.tsx";
import { smartAssembliesService } from "../../../../utils/SmartAssembliesService.ts";

export const config: RouteConfig = {
  skipAppWrapper: true,
  skipInheritedLayouts: true,
};

export default defineRoute(async (_req, ctx) => {
  const address = ctx.params.address;
  const smartAssemblies = await smartAssembliesService.findByCharacter(address);

  return (
    <Partial
      name={`character-tab-content`}
    >
      <Tabs
        killmailsPath={`/partials/character-tabs/killmails/${address}`}
        smartAssembliesPath={`/partials/character-tabs/smartassemblies/${address}`}
        active="smartassemblies"
      />

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
    </Partial>
  );
});
