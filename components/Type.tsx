import { IType } from "../utils/TypeService.ts";

export default function Type({ type }: { type: IType }) {
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
            Mass: {type.mass.toFixed(2)} kg
          </li>

          <li>
            Volume: {type.volume.toFixed(2)} m<sup>3</sup>
          </li>
        </ul>
      </div>
    </div>
  );
}
