// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_500 from "./routes/_500.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_layout from "./routes/_layout.tsx";
import * as $characters_address_ from "./routes/characters/[address].tsx";
import * as $characters_layout from "./routes/characters/_layout.tsx";
import * as $characters_index from "./routes/characters/index.tsx";
import * as $index from "./routes/index.tsx";
import * as $killmails_address_ from "./routes/killmails/[address].tsx";
import * as $killmails_layout from "./routes/killmails/_layout.tsx";
import * as $killmails_index from "./routes/killmails/index.tsx";
import * as $legal_layout from "./routes/legal/_layout.tsx";
import * as $legal_privacy_policy from "./routes/legal/privacy-policy.tsx";
import * as $legal_terms_of_service from "./routes/legal/terms-of-service.tsx";
import * as $news_index from "./routes/news/index.tsx";
import * as $solarsystems_id_ from "./routes/solarsystems/[id].tsx";
import * as $solarsystems_layout from "./routes/solarsystems/_layout.tsx";
import * as $solarsystems_index from "./routes/solarsystems/index.tsx";
import * as $tribes_id_ from "./routes/tribes/[id].tsx";
import * as $tribes_layout from "./routes/tribes/_layout.tsx";
import * as $tribes_index from "./routes/tribes/index.tsx";
import * as $CharacterSearch from "./islands/CharacterSearch.tsx";
import * as $SolarSystemSearch from "./islands/SolarSystemSearch.tsx";
import * as $TribeSearch from "./islands/TribeSearch.tsx";
import type { Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_500.tsx": $_500,
    "./routes/_app.tsx": $_app,
    "./routes/_layout.tsx": $_layout,
    "./routes/characters/[address].tsx": $characters_address_,
    "./routes/characters/_layout.tsx": $characters_layout,
    "./routes/characters/index.tsx": $characters_index,
    "./routes/index.tsx": $index,
    "./routes/killmails/[address].tsx": $killmails_address_,
    "./routes/killmails/_layout.tsx": $killmails_layout,
    "./routes/killmails/index.tsx": $killmails_index,
    "./routes/legal/_layout.tsx": $legal_layout,
    "./routes/legal/privacy-policy.tsx": $legal_privacy_policy,
    "./routes/legal/terms-of-service.tsx": $legal_terms_of_service,
    "./routes/news/index.tsx": $news_index,
    "./routes/solarsystems/[id].tsx": $solarsystems_id_,
    "./routes/solarsystems/_layout.tsx": $solarsystems_layout,
    "./routes/solarsystems/index.tsx": $solarsystems_index,
    "./routes/tribes/[id].tsx": $tribes_id_,
    "./routes/tribes/_layout.tsx": $tribes_layout,
    "./routes/tribes/index.tsx": $tribes_index,
  },
  islands: {
    "./islands/CharacterSearch.tsx": $CharacterSearch,
    "./islands/SolarSystemSearch.tsx": $SolarSystemSearch,
    "./islands/TribeSearch.tsx": $TribeSearch,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
