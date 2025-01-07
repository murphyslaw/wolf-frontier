import { ITribe } from "../utils/TribeService.ts";

export function TribeCompact(
  props: { tribe: ITribe },
) {
  return (
    <a
      href={`/tribes/${props.tribe.id}`}
      class="flex flex-row gap-2 p-2 items-center bodyMedium transition-all bordered hover:text-inherit hover:border-white"
      f-client-nav={false}
    >
      <img
        src={`/images/tribes/${props.tribe.id % 10}.png`}
        width="48px"
        height="48px"
      />

      <div class="flex flex-col p-2">
        <p>
          {props.tribe.name} [{props.tribe.ticker}]
        </p>

        <span class="labelLarge text-grayLight">
          Member Count: {props.tribe.count}
        </span>
      </div>
    </a>
  );
}
