import { Paragraph } from "./Paragraph.tsx";

export function EveToken(props: { balance: number }) {
  return (
    <Paragraph>
      <span class="flex flex-row gap-y-2 items-center">
        <img
          src="/images/eve_token_64px.png"
          width="24px"
          height="24px"
          class="inline"
        />{" "}
        {props.balance}
      </span>
    </Paragraph>
  );
}
