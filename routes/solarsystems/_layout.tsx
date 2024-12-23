import { defineLayout } from "$fresh/src/server/defines.ts";
import SolarSystemSearch from "../../islands/SolarSystemSearch.tsx";
import { solarSystemService } from "../../utils/SolarSystemService.ts";

export default defineLayout(async (req, ctx) => {
  const query = new URL(req.url).searchParams.get("query") || "";
  const total = await solarSystemService.count();

  return (
    <div class="flex flex-col gap-y-8">
      <header>
        <h1 class="displayLarge">
          <span class="text-orange-600">S</span>olar{" "}
          <span class="text-orange-600">S</span>ystems
        </h1>

        <h2 class="headlineMedium uppercase text-white">
          Gravitational forces in a system of three hypermassive black holes
        </h2>
      </header>

      <SolarSystemSearch query={query} total={total} />

      <ctx.Component />
    </div>
  );
});
