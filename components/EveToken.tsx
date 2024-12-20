export function EveToken(props: { balance: number }) {
  return (
    <p class="bodyMedium flex flex-row gap-y-2 items-center">
      <img
        src="/images/eve_token_64px.png"
        width="24px"
        height="24px"
        class="inline"
      />{" "}
      {props.balance}
    </p>
  );
}
