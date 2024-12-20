import { CharacterCompact } from "../../components/CharacterCompact.tsx";
import { characterService } from "../../utils/CharacterService.ts";

export default async function Characters() {
  const wolfMembers = await characterService.listByTribe(98000005);

  return (
    <>
      <h1 class="displayLarge">
        <span class="text-orange">S</span>mart{" "}
        <span class="text-orange">C</span>haracters
      </h1>

      <div class="flex flex-col gap-4 w-full">
        <div>
          <h2 class="headlineLarge">
            Wandering Order of the Last Frontier [WOLF]
          </h2>

          <label class="labelLarge text-grayLight">
            Member Count: {wolfMembers.length}
          </label>
        </div>

        <div class="flex flex-wrap gap-4">
          {wolfMembers.map((member) => (
            <CharacterCompact key={member.address} character={member} />
          ))}
        </div>
      </div>
    </>
  );
}
