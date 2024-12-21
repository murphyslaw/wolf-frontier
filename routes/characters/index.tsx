import { Handlers, PageProps } from "$fresh/server.ts";
import { CharacterCompact } from "../../components/CharacterCompact.tsx";
import { characterService, ICharacter } from "../../utils/CharacterService.ts";

interface Props {
  results: ICharacter[];
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

    const total = await characterService.count();
    const results = await characterService.find(query);

    if (results.length === 1) {
      return new Response("", {
        status: 307,
        headers: { Location: `/characters/${results[0].address}` },
      });
    }

    return ctx.render({
      results: results,
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
        {count}/{total} Survivors found...
      </h2>

      <div class="flex flex-wrap gap-4">
        {results.map((character) => (
          <CharacterCompact key={character.address} character={character} />
        ))}
      </div>
    </section>
  );
}
