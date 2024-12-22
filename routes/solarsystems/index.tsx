import { Handlers, PageProps } from "$fresh/server.ts";
import { SolarSystemCompact } from "../../components/SolarSystemCompact.tsx";
import {
  ISolarSystem,
  solarSystemService,
} from "../../utils/SolarSystemService.ts";

interface Props {
  results: ISolarSystem[];
}

export const handler: Handlers<Props> = {
  async GET(req: Request, ctx) {
    const query = new URL(req.url).searchParams.get("query") || "";

    if (!query) {
      return ctx.render({
        results: await solarSystemService.find("H.59P.E21"),
      });
    }

    const results = await solarSystemService.find(query);

    if (results.length === 1) {
      return new Response("", {
        status: 307,
        headers: { Location: `/solarsystems/${results[0].id}` },
      });
    }

    return ctx.render({
      results: results,
    });
  },
};

export default function SolarSystemsOverviewPage(
  { data: { results } }: PageProps<Props>,
) {
  return (
    <section class="flex flex-wrap gap-4">
      {results.map((solarSystem) => (
        <SolarSystemCompact key={solarSystem.id} solarSystem={solarSystem} />
      ))}
    </section>
  );
}
