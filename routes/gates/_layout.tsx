import { defineLayout } from "$fresh/src/server/defines.ts";

export default defineLayout((_req, ctx) => {
  return (
    <div class="flex flex-col gap-y-8">
      <header>
        <h1 class="displayLarge">
          <span class="text-orange-600">G</span>ate{" "}
          <span class="text-orange-600">N</span>etworks
        </h1>

        <h2 class="headlineMedium uppercase text-white">
          Veins of a thriving society
        </h2>
      </header>

      <p class="w-1/3">
        Every civilization, every individual is in constant movement, without
        rest. Within the Frontier, tribes are constantly extending what was once
        created by the original designers. They even create connections to
        places, where no other has been before.
      </p>

      <ctx.Component />
    </div>
  );
});
