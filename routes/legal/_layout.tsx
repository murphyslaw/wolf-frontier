import { PageProps } from "$fresh/server.ts";

export default function Layout({ Component }: PageProps) {
  return (
    <div class="max-w-[40vw] flex flex-col gap-y-8 mx-auto">
      <Component />
    </div>
  );
}
