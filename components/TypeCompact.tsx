import { IType, typeService } from "../utils/TypeService.ts";

export function TypeCompact(
  { type }: { type: IType },
) {
  return (
    <a
      href={`/types/${type.id}`}
      class="flex flex-row gap-2 p-2 items-center bodyMedium transition-all bordered hover:text-inherit hover:border-white"
      f-client-nav={false}
    >
      <img
        src={type.image}
        width="48px"
        height="48px"
      />

      <div class="flex flex-col p-2">
        <label class="labelLarge text-grayLight">
          {type.category_name} ({type.group_name})
        </label>

        <p>
          {typeService.patchName(type)}
        </p>
      </div>
    </a>
  );
}
