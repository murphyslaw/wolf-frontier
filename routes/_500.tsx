import { Head } from "$fresh/runtime.ts";
import { LinkButton } from "../components/LinkButton.tsx";

export default function Error404() {
  return (
    <div class="flex flex-col gap-y-8 max-w-[40vw]">
      <Head>
        <title>500 - Internal Server Error</title>
      </Head>

      <>
        <h1 class="displayLarge">
          <span class="text-orange">I</span>nternal{" "}
          <span class="text-orange">S</span>erver{" "}
          <span class="text-orange">E</span>rror
        </h1>

        <p class="bodyMedium">
          Gates went offline, storage units are inaccessible, printers stopped
          working and rifts seem to fluctuate with even stronger gravitational
          forces. What's going on? We are informed of the situation, but have to
          recalibrate and find a way out of this mess.
        </p>

        <LinkButton href="/">Warp back to home</LinkButton>
      </>
    </div>
  );
}
