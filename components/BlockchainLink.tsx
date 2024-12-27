interface Props {
  path: string;
}

export function BlockchainLink({ path }: Props) {
  return (
    <a
      href={`https://blockchain-gateway-stillness.live.tech.evefrontier.com/${path}`}
      target="_blank"
      title="blockchain details"
    >
      <svg class="w-4 h-4">
        <use href="/images/icons.svg#link" />
      </svg>
    </a>
  );
}
