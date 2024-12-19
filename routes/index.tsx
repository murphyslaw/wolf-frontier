import { RouteConfig } from "$fresh/server.ts";
import { HeadingOne } from "../components/HeadingOne.tsx";
import LetterHighlight from "../components/LetterHighlight.tsx";
import { Link } from "../components/Link.tsx";
import { LinkButton } from "../components/LinkButton.tsx";
import { Paragraph } from "../components/Paragraph.tsx";

export const config: RouteConfig = {
  skipInheritedLayouts: true, // Skip already inherited layouts
};

export default function Home() {
  return (
    <div
      class="px-4 py-8 mx-auto bg-no-repeat bg-cover h-screen"
      style="background-image: url('/images/gate_bg-3840x2160.png')"
    >
      <div class="max-w-[30vw] flex flex-col gap-y-10">
        <HeadingOne>
          <LetterHighlight>W</LetterHighlight>andering<br />
          <LetterHighlight>O</LetterHighlight>rder of the<br />
          <LetterHighlight>L</LetterHighlight>ast<br />
          <LetterHighlight>F</LetterHighlight>rontier
        </HeadingOne>

        <Paragraph>
          This is an{" "}
          <Link href="https://www.evefrontier.com/">EVE Frontier</Link>{" "}
          fanpage. EVE Frontier is a trademark of CCP ehf. All rights reserved.
          By entering, you agree to adhere to the{" "}
          <Link href="https://www.evefrontier.com/en/nda">
            NDA & Disclaimers
          </Link>.
        </Paragraph>

        <LinkButton href="/characters">Enter</LinkButton>
      </div>
    </div>
  );
}
