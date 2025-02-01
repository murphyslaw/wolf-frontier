import { defineLayout } from "$fresh/server.ts";
import { Footer } from "../components/Footer.tsx";
import { Header } from "../components/Header.tsx";
import { healthService } from "../utils/HealthService.ts";

export default defineLayout(async (_req, ctx) => {
  const online = await healthService.online();

  return (
    <>
      <div class="px-12 py-8 mx-auto flex flex-col gap-y-10">
        <Header />

        <div class="min-h-screen">
          <ctx.Component />
        </div>
      </div>

      <Footer worldApiStatus={online} />
    </>
  );
});
