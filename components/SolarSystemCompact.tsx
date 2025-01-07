import { ISolarSystem } from "../utils/SolarSystemService.ts";

export function SolarSystemCompact(
  { solarSystem }: { solarSystem: ISolarSystem },
) {
  return (
    <a
      href={`/solarsystems/${solarSystem.id}`}
      class="bodyMedium bordered flex flex-row gap-2 p-2 items-center transition-all hover:text-inherit hover:border-white"
    >
      <img
        src={`/images/planets/${solarSystem.id % 10}.png`}
        width="24px"
        height="24px"
      />

      <p>
        {solarSystem.name}
      </p>
    </a>
  );
}
