import { ldapToUtc } from "../utils/formatter.ts";
import { IKillMail } from "../utils/KillmailService.ts";

interface Props {
  killmail: IKillMail;
}

export function Killmail({ killmail }: Props) {
  return (
    <li class="mb-10 ms-4">
      <img
        src="/images/killreport.png"
        class="absolute w-8 h-8 -start-4"
      />

      <span class="absolute -start-20 badge lossTypeBadge" data-state="ship">
        {killmail.loss_type}
      </span>

      <div class="flex flex-col items-start">
        <time
          class="labelLarge text-grayLight"
          datetime={ldapToUtc(killmail.timestamp)}
        >
          {ldapToUtc(killmail.timestamp)}
        </time>

        <h3 class="bodyMedium">
          <a
            href={`/characters/${killmail.killer}`}
            class="text-orange-600 hover:text-orange-600 hover:underline"
            f-client-nav={false}
          >
            {killmail.killer_name || "unknown"} [{killmail.killer_tribe}]
          </a>{" "}
          killed{" "}
          <a
            href={`/characters/${killmail.victim}`}
            class="text-blue-600 hover:text-blue-600 hover:underline"
            f-client-nav={false}
          >
            {killmail.victim_name || "unknown"} [{killmail.victim_tribe}]
          </a>
        </h3>

        <div class="flex items-center gap-2">
          <img src="/images/solarsystem.png" class="inline w-4 h-4" />

          <a
            href={`/solarsystems/${killmail.solar_system_id}`}
            class="bodyMedium text-white"
            f-client-nav={false}
          >
            {killmail.solar_system_name || "unknown"}
          </a>
        </div>
      </div>
    </li>
  );
}
