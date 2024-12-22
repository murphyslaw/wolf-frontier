import { ISolarSystem } from "../utils/SolarSystemService.ts";

export function SolarSystemCompact(
  { solarSystem }: { solarSystem: ISolarSystem },
) {
  return (
    <a href={`/solarsystems/${solarSystem.id}`} class="bodyMedium">
      {solarSystem.name}
    </a>
  );
}
