import { PageProps } from "$fresh/server.ts";
import { Footer } from "../components/Footer.tsx";
import { Header } from "../components/Header.tsx";

export default function Layout(props: PageProps) {
  return (
    <>
      <div
        class="px-12 py-8 mx-auto bg-no-repeat flex flex-col gap-y-10 bg-black"
        style="background-image: url('/images/fade_bg.webp')"
      >
        <Header />

        <div class="min-h-screen">
          <props.Component />
        </div>
      </div>

      <Footer />
    </>
  );
}
