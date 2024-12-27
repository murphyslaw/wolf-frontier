import { Partial } from "$fresh/runtime.ts";
import { smartAssemblyPartial } from "../utils/PartialsHelper.ts";
import { ISmartAssembly } from "../utils/SmartAssembliesService.ts";
import { SmartAssemblyCompact } from "./SmartAssemblyCompact.tsx";

interface Props {
  smartAssemblies: ISmartAssembly[] | undefined;
  type: ISmartAssembly["assembly_type"];
  title: string;
}

export function SmartAssembliesList({ smartAssemblies, type, title }: Props) {
  if (!smartAssemblies) return null;

  return (
    <section class="flex flex-col gap-4" f-client-nav>
      <h2 class="titleMedium">
        {title} ({smartAssemblies.length})
      </h2>

      <main class="grid grid-cols-3 gap-x-8 items-start">
        <div class="flex flex-wrap gap-4 col-span-1">
          {smartAssemblies.map((smartAssembly) => (
            <button
              class="smartAssembly flex flex-row gap-x-4"
              f-partial={smartAssemblyPartial(
                type,
                smartAssembly.smart_assembly_id,
              )}
            >
              <SmartAssemblyCompact smartAssembly={smartAssembly} />
            </button>
          ))}
        </div>

        <section class="col-span-2">
          <Partial name={`smartassemblies-${type.toLowerCase()}-details`} />
        </section>
      </main>
    </section>
  );
}
