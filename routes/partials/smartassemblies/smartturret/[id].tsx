import { Partial } from "$fresh/runtime.ts";
import { defineRoute, RouteConfig } from "$fresh/server.ts";
import { SmartAssembly } from "../../../../components/SmartAssembly.tsx";
import { smartAssembliesService } from "../../../../utils/SmartAssembliesService.ts";

export const config: RouteConfig = {
  skipAppWrapper: true,
  skipInheritedLayouts: true,
};

export default defineRoute(async (_req, ctx) => {
  const smartAssembly = await smartAssembliesService.get(ctx.params.id);

  return (
    <Partial
      name={`smartassemblies-${smartAssembly.assembly_type.toLowerCase()}-details`}
    >
      <SmartAssembly smartAssembly={smartAssembly} />
    </Partial>
  );
});
