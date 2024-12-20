export function Tribe(props: { name: string; ticker: string }) {
  return (
    <p class="bodyMedium text-orange">
      {props.name} [{props.ticker}]
    </p>
  );
}
