import { Config } from "../utils/config.ts";
import { Navigation } from "./Navigation.tsx";

export function Header() {
  return (
    <header class="flex flex-row justify-between items-start">
      <Navigation />

      <div class="w-fit flex flex-col gap-0">
        <img src="/images/frontier_alpha_notice.png" width="192px" />

        <p class="labelSmall text-center">
          Version: {Config.RELEASE_ID}
        </p>

        <p class="labelSmall text-center">
          Last Release: {Config.RELEASE_DATE}
        </p>
      </div>
    </header>
  );
}
