import { RouteConfig } from "$fresh/server.ts";
import { LinkButton } from "../components/LinkButton.tsx";

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
        <h1 class="displayLarge">
          <span class="text-orange">W</span>andering<br />
          <span class="text-orange">O</span>rder of the<br />
          <span class="text-orange">L</span>ast<br />
          <span class="text-orange">F</span>rontier
        </h1>

        <p class="bodyMedium">
          This is an{" "}
          <a href="https://www.evefrontier.com/">
            EVE Frontier
          </a>{" "}
          fanpage. EVE Frontier is a trademark of CCP ehf. All rights reserved.
          By entering, you agree to adhere to the{" "}
          <a href="https://www.evefrontier.com/en/nda">
            NDA & Disclaimers
          </a>.
        </p>

        <LinkButton href="/characters">Enter</LinkButton>
      </div>
    </div>
  );
}
