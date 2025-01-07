interface Props {
  id: number;
}

export function SolarSystemMapLink({ id }: Props) {
  const link = `https://frontier-atlas.com/map?system=${id}`;

  return (
    <a
      class="map"
      href={link}
      title="open solar system on map"
      target="_blank"
    >
      <svg>
        <use href="/images/icons.svg#pin" />
      </svg>
    </a>
  );
}
