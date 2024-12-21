import { FreshContext } from "$fresh/server.ts";
import { CharacterCompact } from "../../components/CharacterCompact.tsx";
import { characterService } from "../../utils/CharacterService.ts";

export default async function Characters(_req: Request, ctx: FreshContext) {
  const wolfMembers = await characterService.listByTribe(98000005);

  return (
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
  );
}
