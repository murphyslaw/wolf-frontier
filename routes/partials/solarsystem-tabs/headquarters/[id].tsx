import { Partial } from "$fresh/runtime.ts";
import { defineRoute, RouteConfig } from "$fresh/server.ts";
import { Tabs } from "../../../../components/Tabs.tsx";
import { TribeCompact } from "../../../../components/TribeCompact.tsx";
import { typeService } from "../../../../utils/TribeService.ts";

export const config: RouteConfig = {
  skipAppWrapper: true,
  skipInheritedLayouts: true,
};

export default defineRoute(async (_req, ctx) => {
  const id = Number(ctx.params.id);
  const tribes = await typeService.findByHeadquarters(id);

  return (
    <Partial
      name={`solarsystem-tab-content`}
    >
      <Tabs
        killmailsPath={`/partials/solarsystem-tabs/killmails/${id}`}
        smartAssembliesPath={`/partials/solarsystem-tabs/smartassemblies/${id}`}
        headquartersPath={`/partials/solarsystem-tabs/headquarters/${id}`}
        active="headquarters"
      />

      <div class="flex flex-wrap gap-4">
        {tribes.map((tribe) => <TribeCompact key={tribe.id} tribe={tribe} />)}
      </div>
    </Partial>
  );
});
