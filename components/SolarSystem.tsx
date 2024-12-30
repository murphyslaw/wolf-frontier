import { SolarSystemInGameLink } from "../islands/SolarSystemInGameLink.tsx";
import { ISolarSystem } from "../utils/SolarSystemService.ts";

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

            <SolarSystemInGameLink
              id={solarSystem.id}
              name={solarSystem.name}
            />
          </div>

          <h1 class="headlineLarge">
            {solarSystem.name}
          </h1>

          <ul class="bulletList">
            <li class="text-nowrap">REGION: {solarSystem.region}</li>
            <li class="text-nowrap">
              CONSTELLATION: {solarSystem.constellation}
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
