import { Head } from "$fresh/runtime.ts";
import { LinkButton } from "../components/LinkButton.tsx";

export default function Error404() {
  return (
    <div class="flex flex-col gap-y-8 max-w-[40vw]">
      <Head>
        <title>404 - Page not found</title>
      </Head>

      <>
        <h1 class="displayLarge">
          <span class="text-orange">P</span>age{" "}
          <span class="text-orange">n</span>ot{" "}
          <span class="text-orange">f</span>ound
        </h1>

        <p class="bodyMedium">
          The system you were looking for doesn't exist in the shattered
          Frontier. Did you make the right jump?
        </p>

        <LinkButton href="/">Warp back to home</LinkButton>
      </>
    </div>
  );
}
