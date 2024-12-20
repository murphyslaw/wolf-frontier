import { FreshContext } from "$fresh/server.ts";
import { HeadingOne } from "../../components/HeadingOne.tsx";
import LetterHighlight from "../../components/LetterHighlight.tsx";
import { characterService } from "../../utils/CharacterService.ts";

export default async function Characters(_req, ctx: FreshContext) {
  const count = await characterService.count();

  return (
    <>
      <HeadingOne>
        <LetterHighlight>S</LetterHighlight>mart{" "}
        <LetterHighlight>C</LetterHighlight>haracters
      </HeadingOne>

      <pre>
        {count}
      </pre>
    </>
  );
}
