import { ISmartAssembly } from "../utils/SmartAssembliesService.ts";
import { OnlineIndicator } from "./OnlineIndicator.tsx";

interface Props {
  smartAssembly: ISmartAssembly;
}

export function SmartAssemblyCompact({ smartAssembly }: Props) {
  return (
    <div class="bordered p-1 relative hover:border hover:border-white">
      <img
        class="w-10 h-10"
        src="/images/smartassembly.png"
        alt={smartAssembly.assembly_type}
      />

      <OnlineIndicator online={smartAssembly.is_online} />

      <meter
        min={0}
        max={smartAssembly.fuel_max_capacity}
        low={3000}
        high={6000}
        optimum={8000}
        value={smartAssembly.fuel_amount}
        title={`${smartAssembly.fuel_amount} Salt`}
      />
    </div>
  );
}
