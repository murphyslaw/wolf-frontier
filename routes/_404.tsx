import { Head } from "$fresh/runtime.ts";
import { HeadingOne } from "../components/HeadingOne.tsx";
import LetterHighlight from "../components/LetterHighlight.tsx";
import { LinkButton } from "../components/LinkButton.tsx";
import { Paragraph } from "../components/Paragraph.tsx";

export default function Error404() {
  return (
    <div class="flex flex-col gap-y-8 max-w-[40vw]">
      <Head>
        <title>404 - Page not found</title>
      </Head>

      <>
        <HeadingOne>
          <LetterHighlight>P</LetterHighlight>age{" "}
          <LetterHighlight>n</LetterHighlight>ot{" "}
          <LetterHighlight>f</LetterHighlight>ound
        </HeadingOne>

        <Paragraph>
          The system you were looking for doesn't exist in the shattered
          Frontier. Did you make the right jump?
        </Paragraph>

        <LinkButton href="/">Warp back to home</LinkButton>
      </>
    </div>
  );
}
