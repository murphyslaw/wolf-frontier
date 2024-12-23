import { Partial } from "$fresh/runtime.ts";
import { defineRoute, RouteConfig } from "$fresh/server.ts";
import { OnlineBadgeIndicator } from "../../../../components/OnlineBadgeIndicator.tsx";
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
      <div class="flex flex-wrap gap-8 items-start">
        <img
          class="max-w-40 w-full"
          src="/images/building/smartgate.png"
          alt={smartAssembly.assembly_type}
        />

        <div class="flex flex-col items-start gap-2">
          <div class="w-full flex flex-row items-center justify-between">
            <OnlineBadgeIndicator online={smartAssembly.is_online} />

            <a
              href={`https://blockchain-gateway-stillness.live.tech.evefrontier.com/smartassemblies/${smartAssembly.smart_assembly_id}`}
              target="_blank"
            >
              <svg class="w-4 h-4">
                <use href="/images/icons.svg#link" />
              </svg>
            </a>
          </div>

          <div>
            <h2 class="headlineLarge">
              Smart Gate
            </h2>

            <p class="labelLarge text-grayLight">{smartAssembly.name}</p>
          </div>

          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <img src="/images/solarsystem.png" class="inline w-6 h-6" />

              <a
                href={`/solarsystems/${smartAssembly.solar_system_id}`}
                class="bodyMedium text-white"
              >
                {smartAssembly.solar_system_name}
              </a>
            </div>

            <div class="flex items-center gap-2">
              <img src="/images/owner.png" class="inline w-6 h-6" />

              <a
                href={`/characters/${smartAssembly.owner_id}`}
                class="bodyMedium"
                f-client-nav={false}
              >
                {smartAssembly.owner_name}
              </a>
            </div>

            <div class="flex items-center gap-2">
              <img src="/images/salt.png" class="inline w-6 h-6" />

              <meter
                min={0}
                max={smartAssembly.fuel_max_capacity}
                low={2000}
                high={5000}
                optimum={8000}
                value={smartAssembly.fuel_amount}
                title={`${smartAssembly.fuel_amount} Salt`}
              />

              <span class="labelLarge text-grayLight">
                ({`${smartAssembly.fuel_amount} Salt`})
              </span>
            </div>
          </div>

          <hr class="border-gray w-full" />

          <p class="bodyMedium">{smartAssembly.description}</p>
        </div>
      </div>
    </Partial>
  );
});
