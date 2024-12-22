import { ITribe } from "../utils/TribeService.ts";

export function TribeCompact(
  props: { tribe: ITribe },
) {
  return (
    <p class="flex flex-col w-full">
      <a href={`/tribes/${props.tribe.id}`} class="bodyMedium block">
        {props.tribe.name} [{props.tribe.ticker}]
      </a>

      <span class="labelLarge text-grayLight">
        Member Count: {props.tribe.count}
      </span>
    </p>
  );
}
