import { defineLayout } from "$fresh/src/server/defines.ts";
import TypeSearch from "../../islands/TypeSearch.tsx";
import { typeService } from "../../utils/TypeService.ts";

export default defineLayout(async (req, ctx) => {
  const query = new URL(req.url).searchParams.get("query") || "";
  const total = await typeService.count();

  return (
    <div class="flex flex-col gap-y-8">
      <header>
        <h1 class="displayLarge">
          <span class="text-orange-600">T</span>ypes
        </h1>

        <h2 class="headlineMedium uppercase text-white">
          No clouds on this horizon. We've got clear skies.
        </h2>
      </header>

      <TypeSearch query={query} total={total} />

      <ctx.Component />
    </div>
  );
});
