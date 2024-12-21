import { PageProps } from "$fresh/server.ts";
import CharacterSearch from "../../islands/CharacterSearch.tsx";

export default function Layout(props: PageProps) {
  const query = new URL(props.url).searchParams.get("query") || "";

  return (
    <div class="flex flex-col gap-y-8">
      <header>
        <h1 class="displayLarge">
          <span class="text-orange">S</span>mart{" "}
          <span class="text-orange">C</span>haracters
        </h1>

        <h2 class="headlineMedium uppercase text-white">
          Inhabitants and survivors of the frontier
        </h2>
      </header>

      <CharacterSearch query={query} />

      <props.Component />
    </div>
  );
}
