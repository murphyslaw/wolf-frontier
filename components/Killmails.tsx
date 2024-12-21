import { ldapToUtc } from "../utils/formatter.ts";
import { IKillMail } from "../utils/KillmailService.ts";

export function Killmails({ killmails }: { killmails: IKillMail[] }) {
  return (
    <div class="flex flex-col gap-y-8">
      <h2 class="headlineLarge">Most recent kills ({killmails.length})</h2>

      {killmails.map((killmail) => (
        <p class="bodyMedium">
          <a
            href={`/characters/${killmail.killer}`}
            class="text-orange hover:text-orange hover:underline"
          >
            {killmail.killer_name || "unknown"}
          </a>{" "}
          killed{" "}
          <a
            href={`/characters/${killmail.victim}`}
            class="text-blue hover:text-blue hover:underline"
          >
            {killmail.victim_name || "unknown"}
          </a>{" "}
          ({killmail.loss_type}) in{" "}
          <a href={`/solarsystems/${killmail.solar_system_id}`}>
            {killmail.solar_system_name || "unknown"}
          </a>{" "}
          @ {ldapToUtc(killmail.timestamp)}
        </p>
      ))}
    </div>
  );
}
