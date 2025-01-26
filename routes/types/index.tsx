import { Handlers, PageProps } from "$fresh/server.ts";
import { TypeCompact } from "../../components/TypeCompact.tsx";
import { IType, typeService } from "../../utils/TypeService.ts";

interface Props {
  results: IType[];
}

export const handler: Handlers<Props> = {
  async GET(req: Request, ctx) {
    const query = new URL(req.url).searchParams.get("query") || "";

    if (!query) {
      return ctx.render({
        results: await typeService.findByCategory("Ship"),
      });
    }

    const results = await typeService.find(query);

    if (results.length === 1) {
      return new Response("", {
        status: 307,
        headers: { Location: `/types/${results[0].id}` },
      });
    }

    return ctx.render({
      results: results,
    });
  },
};

export default function TypesOverviewPage(
  { data: { results } }: PageProps<Props>,
) {
  return (
    <section class="flex flex-wrap gap-4">
      {results.map((type) => <TypeCompact key={type.id} type={type} />)}
    </section>
  );
}
