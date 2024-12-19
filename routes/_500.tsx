import { Head } from "$fresh/runtime.ts";
import { HeadingOne } from "../components/HeadingOne.tsx";
import LetterHighlight from "../components/LetterHighlight.tsx";
import { LinkButton } from "../components/LinkButton.tsx";
import { Paragraph } from "../components/Paragraph.tsx";

export default function Error404() {
  return (
    <div class="flex flex-col gap-y-8 max-w-[40vw]">
      <Head>
        <title>500 - Internal Server Error</title>
      </Head>

      <>
        <HeadingOne>
          <LetterHighlight>I</LetterHighlight>nternal{" "}
          <LetterHighlight>S</LetterHighlight>erver{" "}
          <LetterHighlight>E</LetterHighlight>rror
        </HeadingOne>

        <Paragraph>
          Gates went offline, storage units are inaccessible, printers stopped
          working and rifts seem to fluctuate with even stronger gravitational
          forces. What's going on? We are informed of the situation, but have to
          recalibrate and find a way out of this mess.
        </Paragraph>

        <LinkButton href="/">Warp back to home</LinkButton>
      </>
    </div>
  );
}
