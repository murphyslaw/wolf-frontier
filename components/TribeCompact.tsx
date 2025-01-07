import { ITribe } from "../utils/TribeService.ts";

export function TribeCompact(
  props: { tribe: ITribe },
) {
  return (
    <a
      href={`/tribes/${props.tribe.id}`}
      class="flex flex-col p-2 bodyMedium transition-all bordered hover:text-inherit hover:border-white"
      f-client-nav={false}
    >
      <p>
        {props.tribe.name} [{props.tribe.ticker}]
      </p>

      <span class="labelLarge text-grayLight">
        Member Count: {props.tribe.count}
      </span>
    </a>
  );
}
