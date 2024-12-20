import "jsr:@std/dotenv/load";

export class Config {
  static DB_PASSWORD: string = String(Deno.env.get("DB_PASSWORD"));
  static DB_USER: string = String(Deno.env.get("DB_USER"));
  static DB_NAME: string = String(Deno.env.get("DB_NAME"));
  static DB_HOST: string = String(Deno.env.get("DB_HOST"));
  static DB_PORT: number = Number(Deno.env.get("DB_PORT"));
}
