import { defineLayout } from "$fresh/src/server/defines.ts";
import TribeSearch from "../../islands/TribeSearch.tsx";
import { tribeService } from "../../utils/TribeService.ts";

export default defineLayout(async (req, ctx) => {
  const query = new URL(req.url).searchParams.get("query") || "";
  const total = await tribeService.count();

  return (
    <div class="flex flex-col gap-y-8">
      <header>
        <h1 class="displayLarge">
          <span class="text-orange">T</span>ribes
        </h1>

        <h2 class="headlineMedium uppercase text-white">
          Volatile assemblies of survivors working towards a common goal
        </h2>
      </header>

      <TribeSearch query={query} total={total} />

      <ctx.Component />
    </div>
  );
});
