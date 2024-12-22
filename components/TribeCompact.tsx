import { ITribe } from "../utils/TribeService.ts";

export function TribeCompact(
  props: { tribe: ITribe },
) {
  return (
    <div class="flex flex-col w-full">
      <a href={`/tribes/${props.tribe.id}`} class="headlineLarge block">
        {props.tribe.name} [{props.tribe.ticker}]
      </a>

      <label class="labelLarge text-grayLight">
        Member Count: {props.tribe.count}
      </label>
    </div>
  );
}
