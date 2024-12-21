import { PageProps } from "$fresh/server.ts";
import TribeSearch from "../../islands/TribeSearch.tsx";

export default function Layout(props: PageProps) {
  const query = new URL(props.url).searchParams.get("query") || "";

  return (
    <div class="flex flex-col gap-y-8">
      <header>
        <h1 class="displayLarge">
          <span class="text-orange">T</span>ribes
        </h1>

        <h2 class="headlineMedium uppercase text-white">
          Volatile assemblies of survivors working towards a common goal
        </h2>
      </header>

      <TribeSearch query={query} />

      <props.Component />
    </div>
  );
}
