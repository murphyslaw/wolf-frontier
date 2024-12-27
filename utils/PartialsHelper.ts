import { ISmartAssembly } from "./SmartAssembliesService.ts";

export function smartAssemblyPartial(
  type: ISmartAssembly["assembly_type"],
  id: ISmartAssembly["smart_assembly_id"],
) {
  return `/partials/smartassemblies/${type.toLowerCase()}/${id}`;
}
