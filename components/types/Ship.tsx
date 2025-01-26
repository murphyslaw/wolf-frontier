import { IType } from "../../utils/TypeService.ts";

export default function Ship({ type }: { type: IType }) {
  const maxJumpDistance: number = 22100 * 40 * (100000 / (type.mass + 800000));

  return (
    <div class="flex flex-row gap-4">
      <div class="bordered p-2">
        <img
          src={type.image}
          width="124px"
          height="124px"
        />
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-0">
          <div class="w-full flex flex-row items-center justify-between">
            <label class="labelLarge text-grayLight">
              {type.category_name} ({type.group_name})
            </label>
          </div>

          <h2 class="headlineLarge">
            {type.name}
          </h2>
        </div>

        <ul class="bulletList bodyMedium">
          <li>
            ID: {type.id}
          </li>

          <li>
            Mass (kg): {type.mass}
          </li>

          <li>
            Volume (m^3): {type.volume}
          </li>

          <li>
            Max Jump Distance: {maxJumpDistance}
          </li>
        </ul>
      </div>
    </div>
  );
}
