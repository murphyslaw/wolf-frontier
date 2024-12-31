import { defineLayout } from "$fresh/server.ts";

export default defineLayout((_req, ctx) => {
  return (
    <div class="flex flex-col gap-y-8">
      <header>
        <h1 class="displayLarge">
          <span class="text-orange-600">C</span>ommunity{" "}
          <span class="text-orange-600">R</span>esources
        </h1>

        <h2 class="headlineMedium uppercase text-white">
          "Communication leads to community, that is, to understanding, intimacy
          and mutual valuing." - Rollo May
        </h2>
      </header>

      <ctx.Component />
    </div>
  );
});
