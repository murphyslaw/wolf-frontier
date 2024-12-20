import { Paragraph } from "./Paragraph.tsx";

export function Tribe(props: { name: string; ticker: string }) {
  return (
    <Paragraph>
      <span class="text-orange">
        {props.name} [{props.ticker}]
      </span>
    </Paragraph>
  );
}
