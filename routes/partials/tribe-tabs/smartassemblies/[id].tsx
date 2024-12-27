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
  const id = Number(ctx.params.id);
  const smartAssemblies = await smartAssembliesService.findByTribe(id);

  return (
    <Partial
      name={`tribe-tab-content`}
    >
      <Tabs
        killmailsPath={`/partials/tribe-tabs/killmails/${id}`}
        smartAssembliesPath={`/partials/tribe-tabs/smartassemblies/${id}`}
        active="smartassemblies"
      />

      <div class="flex flex-col gap-4">
        <SmartAssembliesList
          type="SmartGate"
          smartAssemblies={smartAssemblies.SmartGate}
          title="Smart Gates"
        />

        <SmartAssembliesList
          type="SmartTurret"
          smartAssemblies={smartAssemblies.SmartTurret}
          title="Smart Turrets"
        />

        <SmartAssembliesList
          type="SmartStorageUnit"
          smartAssemblies={smartAssemblies.SmartStorageUnit}
          title="Smart Storage Units"
        />
      </div>
    </Partial>
  );
});
