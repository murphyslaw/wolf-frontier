import { type PageProps } from "$fresh/server.ts";

export default function App({ Component }: PageProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>
          Wandering Order of the Last Frontier [WOLF] - EVE Frontier
        </title>

        <link rel="stylesheet" href="/styles.css" />
      </head>

      <body
        class="bg-no-repeat bg-black"
        style="background-image: url('/images/fade_bg.webp');"
      >
        <Component />
      </body>
    </html>
  );
}
