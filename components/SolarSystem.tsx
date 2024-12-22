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
          <label class="labelLarge text-grayLight">
            {solarSystem.id}
          </label>

          <h1 class="headlineLarge">
            {solarSystem.name}
          </h1>

          <ul class="bulletList">
            <li>X: {solarSystem.x}</li>
            <li>Y: {solarSystem.y}</li>
            <li>Z: {solarSystem.z}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
