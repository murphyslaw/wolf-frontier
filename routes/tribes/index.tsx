import { Handlers, PageProps } from "$fresh/server.ts";
import { TribeCompact } from "../../components/TribeCompact.tsx";
import { ITribe, typeService } from "../../utils/TribeService.ts";

interface Props {
  results: ITribe[];
}

export const handler: Handlers<Props> = {
  async GET(req: Request, ctx) {
    const query = new URL(req.url).searchParams.get("query") || "";

    if (!query) {
      const defaultResults = await typeService.findAllByIds([
        98000007,
        98000003,
        98000006,
        98000012,
        98000064,
        98000113,
        98000118,
        98000146,
        98000148,
        98000150,
        98000151,
        98000169,
        98000005,
      ]);

      return ctx.render({
        results: defaultResults,
      });
    }

    const results = await typeService.find(query);

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
    <section class="flex flex-wrap gap-4">
      {results.map((tribe) => <TribeCompact key={tribe.id} tribe={tribe} />)}
    </section>
  );
}
