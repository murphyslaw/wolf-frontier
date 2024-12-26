import postgres from "https://deno.land/x/postgresjs@v3.4.5/mod.js";
import { Config } from "./config.ts";

export const sql = postgres({
  hostname: Config.DB_HOST,
  port: Config.DB_PORT,
  username: Config.DB_USER,
  password: Config.DB_PASSWORD,
  database: Config.DB_NAME,
  transform: {
    undefined: null,
  },
});

export type ISql = postgres.Sql;
export type IKv = Deno.Kv;
