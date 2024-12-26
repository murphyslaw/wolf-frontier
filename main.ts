/// <reference no-default-lib="true" />
/// <reference lib="deno.unstable" />
/// <reference lib="dom" />
/// <reference lib="dom.iterable" />
/// <reference lib="dom.asynciterable" />
/// <reference lib="deno.ns" />

import "$std/dotenv/load.ts";

import { start } from "$fresh/server.ts";
import config from "./fresh.config.ts";
import manifest from "./fresh.gen.ts";
import { cronService } from "./utils/CronService.ts";

cronService.init();

await start(manifest, config);
