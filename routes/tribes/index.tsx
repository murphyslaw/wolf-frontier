import { Handlers, PageProps } from "$fresh/server.ts";
import { TribeCompact } from "../../components/TribeCompact.tsx";
import { ITribe, tribeService } from "../../utils/TribeService.ts";

interface Props {
  results: ITribe[];
  query: string;
  count: number;
  total: number;
}

export const handler: Handlers<Props> = {
  async GET(req: Request, ctx) {
    const query = new URL(req.url).searchParams.get("query") || "";

    if (!query) {
      return ctx.render({
        results: [],
        query,
        count: 0,
        total: 0,
      });
    }

    const total = await tribeService.count();
    const results = await tribeService.find(query);

    if (results.length === 1) {
      return new Response("", {
        status: 307,
        headers: { Location: `/tribes/${results[0].id}` },
      });
    }

    return ctx.render({
      results,
      query,
      count: results.length,
      total,
    });
  },
};

export default function Characters(
  { data: { results, count, total } }: PageProps<Props>,
) {
  if (!count) return;

  return (
    <section class="flex flex-col gap-y-8 items-center">
      <h2 class="displayLarge border-t border-b border-dashed border-orange text-orange p-4 text-center">
        {count}/{total} Tribes found...
      </h2>

      <div class="flex flex-wrap gap-4">
        {results.map((tribe) => <TribeCompact key={tribe.id} tribe={tribe} />)}
      </div>
    </section>
  );
}
