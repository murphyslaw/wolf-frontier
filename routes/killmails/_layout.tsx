import { PageProps } from "$fresh/server.ts";

export default function Layout(props: PageProps) {
  return (
    <div class="flex flex-col gap-y-8">
      <header>
        <h1 class="displayLarge">
          <span class="text-orange">K</span>illmails
        </h1>

        <h2 class="headlineMedium uppercase text-white">
          Death is certain and just a form of communication
        </h2>
      </header>

      <props.Component />
    </div>
  );
}
