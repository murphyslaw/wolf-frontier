import { SolarSystemInGameLink } from "../islands/SolarSystemInGameLink.tsx";
import { ISolarSystem } from "../utils/SolarSystemService.ts";
import { SolarSystemMapLink } from "./SolarSystemMapLink.tsx";

export function SolarSystem({ solarSystem }: { solarSystem: ISolarSystem }) {
  return (
    <div class="flex flex-row gap-4">
      <div class="bordered p-2">
        <img
          src={`/images/planets/${solarSystem.id % 10}.png`}
          width="124px"
          height="124px"
        />
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-0">
          <div class="w-full flex flex-row items-center justify-between">
            <label class="labelLarge text-grayLight">
              {solarSystem.id}
            </label>

            <div>
              <SolarSystemInGameLink
                id={solarSystem.id}
                name={solarSystem.name}
              />

              <SolarSystemMapLink
                id={solarSystem.id}
              />
            </div>
          </div>

          <h1 class="headlineLarge">
            {solarSystem.name}
          </h1>

          <ul class="bulletList">
            <li class="text-nowrap">
              REGION: {solarSystem.region}{" "}
              ({solarSystem.region_solar_system_count} solar systems)
            </li>

            <li class="text-nowrap">
              CONSTELLATION: {solarSystem.constellation}{" "}
              ({solarSystem.constellation_solar_system_count} solar systems)
            </li>

            <li class="text-nowrap">X: {solarSystem.x}</li>

            <li class="text-nowrap">Y: {solarSystem.y}</li>

            <li class="text-nowrap">Z: {solarSystem.z}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
