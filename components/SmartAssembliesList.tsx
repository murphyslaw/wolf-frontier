import { Partial } from "$fresh/runtime.ts";
import { ISmartAssembly } from "../utils/SmartAssembliesService.ts";
import { SmartAssemblyCompact } from "./SmartAssemblyCompact.tsx";

interface Props {
  smartAssemblies: ISmartAssembly[] | undefined;
  type: ISmartAssembly["assembly_type"];
  title: string;
}

function partial(
  type: Props["type"],
  id: ISmartAssembly["smart_assembly_id"],
) {
  return `/partials/smartassemblies/${type.toLowerCase()}/${id}`;
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
              f-partial={partial(type, smartAssembly.smart_assembly_id)}
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
