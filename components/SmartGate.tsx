import { smartAssemblyPartial } from "../utils/PartialsHelper.ts";
import { ISmartAssembly } from "../utils/SmartAssembliesService.ts";
import { BlockchainLink } from "./BlockchainLink.tsx";
import { LinkedSmartGateBadgeIndicator } from "./LinkedSmartGateBadgeIndicator.tsx";
import { OnlineBadgeIndicator } from "./OnlineBadgeIndicator.tsx";
import { SmartAssemblyCompact } from "./SmartAssemblyCompact.tsx";

interface Props {
  smartAssembly: ISmartAssembly;
  destination: ISmartAssembly | null;
}

export function SmartGate({ smartAssembly, destination }: Props) {
  return (
    <div class="flex flex-wrap gap-8 items-start">
      <div class="flex flex-col items-center gap-6">
        <img
          class="max-w-40 w-full"
          src={`/images/building/${smartAssembly.assembly_type.toLowerCase()}.png`}
          alt={smartAssembly.assembly_type}
        />

        <LinkedSmartGateBadgeIndicator
          linked={Boolean(smartAssembly.destination_gate)}
        />

        {destination && (
          <button
            class="smartAssembly flex flex-row gap-x-4"
            f-partial={smartAssemblyPartial(
              "SmartGate",
              destination.smart_assembly_id,
            )}
          >
            <SmartAssemblyCompact
              smartAssembly={destination}
            />
          </button>
        )}
      </div>

      <div class="flex flex-col items-start gap-2">
        <div class="w-full flex flex-row items-center justify-between">
          <OnlineBadgeIndicator online={smartAssembly.is_online} />

          <BlockchainLink
            path={`smartassemblies/${smartAssembly.smart_assembly_id}`}
          />
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
  );
}
