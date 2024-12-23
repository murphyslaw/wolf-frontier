import { IKillMail } from "../utils/KillmailService.ts";
import { Killmail } from "./Killmail.tsx";

export function Killmails({ killmails }: { killmails: IKillMail[] }) {
  return (
    <ol class="relative border-s border-neutral-700">
      {killmails.map((killmail) => (
        <Killmail key={killmail.id} killmail={killmail} />
      ))}
    </ol>
  );
}
