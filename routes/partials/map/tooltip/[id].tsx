import { defineRoute, RouteConfig } from "$fresh/server.ts";
import { SolarSystem } from "../../../../components/SolarSystem.tsx";
import { solarSystemService } from "../../../../utils/SolarSystemService.ts";
import { Tooltip } from "../../../../utils/Tooltip.ts";

export const config: RouteConfig = {
  skipAppWrapper: true,
  skipInheritedLayouts: true,
};

export default defineRoute(async (_req, ctx) => {
  const solarSystemId = Number(ctx.params.id);
  const solarSystem = await solarSystemService.get(solarSystemId);

  return (
    <div id={Tooltip.ID} class="p-4">
      <SolarSystem solarSystem={solarSystem} />
    </div>
  );
});
