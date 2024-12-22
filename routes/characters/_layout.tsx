import { defineLayout } from "$fresh/src/server/defines.ts";
import CharacterSearch from "../../islands/CharacterSearch.tsx";
import { characterService } from "../../utils/CharacterService.ts";

export default defineLayout(async (req, ctx) => {
  const query = new URL(req.url).searchParams.get("query") || "";
  const total = await characterService.count();

  return (
    <div class="flex flex-col gap-y-8">
      <header>
        <h1 class="displayLarge">
          <span class="text-orange">S</span>mart{" "}
          <span class="text-orange">C</span>haracters
        </h1>

        <h2 class="headlineMedium uppercase text-white">
          Inhabitants and survivors of the frontier
        </h2>
      </header>

      <CharacterSearch query={query} total={total} />

      <ctx.Component />
    </div>
  );
});
