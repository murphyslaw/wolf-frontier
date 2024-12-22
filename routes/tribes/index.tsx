import { Handlers, PageProps } from "$fresh/server.ts";
import { TribeCompact } from "../../components/TribeCompact.tsx";
import { ITribe, tribeService } from "../../utils/TribeService.ts";

interface Props {
  results: ITribe[];
}

export const handler: Handlers<Props> = {
  async GET(req: Request, ctx) {
    const query = new URL(req.url).searchParams.get("query") || "";

    if (!query) {
      const defaultResults = await tribeService.find("98000005");

      return ctx.render({
        results: defaultResults,
      });
    }

    const results = await tribeService.find(query);

    if (results.length === 1) {
      return new Response("", {
        status: 307,
        headers: { Location: `/tribes/${results[0].id}` },
      });
    }

    return ctx.render({
      results,
    });
  },
};

export default function Characters(
  { data: { results } }: PageProps<Props>,
) {
  return (
    <section class="flex flex-col gap-4">
      {results.map((tribe) => <TribeCompact key={tribe.id} tribe={tribe} />)}
    </section>
  );
}
