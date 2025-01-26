import { calculateMaxJumpDistance } from "../../utils/MathHelper.ts";
import { IType, typeService } from "../../utils/TypeService.ts";
import { BlockchainLink } from "../BlockchainLink.tsx";

export default function Ship({ type }: { type: IType }) {
  const maxJumpDistance: number = calculateMaxJumpDistance(type);

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

            <BlockchainLink
              path={`types/${type.id}`}
            />
          </div>

          <h2 class="headlineLarge">
            {typeService.patchName(type)}
          </h2>
        </div>

        <ul class="bulletList bodyMedium">
          <li>
            ID: {type.id}
          </li>

          <li>
            Mass: {type.mass} kg
          </li>

          <li>
            Volume: {type.volume.toFixed(2)} m<sup>3</sup>
          </li>

          <li>
            Max Jump Distance: {maxJumpDistance.toFixed(2)} ly
          </li>
        </ul>
      </div>
    </div>
  );
}
