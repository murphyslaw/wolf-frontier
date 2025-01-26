import { IType } from "../utils/TypeService.ts";

export function TypeCompact(
  props: { type: IType },
) {
  return (
    <a
      href={`/types/${props.type.id}`}
      class="flex flex-row gap-2 p-2 items-center bodyMedium transition-all bordered hover:text-inherit hover:border-white"
      f-client-nav={false}
    >
      <img
        src={props.type.image}
        width="48px"
        height="48px"
      />

      <div class="flex flex-col p-2">
        <label class="labelLarge text-grayLight">
          {props.type.category_name} ({props.type.group_name})
        </label>

        <p>
          {props.type.name}
        </p>
      </div>
    </a>
  );
}
