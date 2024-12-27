import { Partial } from "$fresh/runtime.ts";
import { defineRoute, RouteConfig } from "$fresh/server.ts";
import { SmartGate } from "../../../../components/SmartGate.tsx";
import { smartAssembliesService } from "../../../../utils/SmartAssembliesService.ts";

export const config: RouteConfig = {
  skipAppWrapper: true,
  skipInheritedLayouts: true,
};

export default defineRoute(async (_req, ctx) => {
  const smartAssembly = await smartAssembliesService.get(ctx.params.id);

  if (!smartAssembly) {
    return null;
  }

  const destination = await smartAssembliesService.get(
    smartAssembly?.destination_gate,
  );

  return (
    <Partial
      name={`smartassemblies-${smartAssembly.assembly_type.toLowerCase()}-details`}
    >
      <SmartGate smartAssembly={smartAssembly} destination={destination} />
    </Partial>
  );
});
