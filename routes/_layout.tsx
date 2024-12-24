import { defineLayout } from "$fresh/server.ts";
import { Footer } from "../components/Footer.tsx";
import { Header } from "../components/Header.tsx";
import { worldApiService } from "../utils/WorldApiService.ts";

export default defineLayout(async (_req, ctx) => {
  const online = await worldApiService.online();

  return (
    <>
      <div
        class="px-12 py-8 mx-auto bg-no-repeat flex flex-col gap-y-10 bg-black"
        style="background-image: url('/images/fade_bg.webp')"
      >
        <Header />

        <div class="min-h-screen">
          <ctx.Component />
        </div>
      </div>

      <Footer worldApiStatus={online} />
    </>
  );
});
