import { Handlers, PageProps } from "$fresh/server.ts";
import { CharacterCompact } from "../../components/CharacterCompact.tsx";
import { characterService, ICharacter } from "../../utils/CharacterService.ts";

interface Props {
  results: ICharacter[];
}

export const handler: Handlers<Props> = {
  async GET(req: Request, ctx) {
    const query = new URL(req.url).searchParams.get("query") || "";

    if (!query) {
      const defaultResults = await characterService.findByTribe(98000005);

      return ctx.render({
        results: defaultResults,
      });
    }

    const results = await characterService.find(query);

    if (results.length === 1) {
      return new Response("", {
        status: 307,
        headers: { Location: `/characters/${results[0].address}` },
      });
    }

    return ctx.render({
      results: results,
    });
  },
};

export default function Characters(
  { data: { results } }: PageProps<Props>,
) {
  return (
    <section class="flex flex-wrap gap-4">
      {results.map((character) => (
        <CharacterCompact key={character.address} character={character} />
      ))}
    </section>
  );
}
