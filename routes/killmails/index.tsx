import { Handlers, PageProps } from "$fresh/server.ts";
import { Killmails } from "../../components/Killmails.tsx";
import { ITopKills, TopKills } from "../../components/TopKills.tsx";
import { IKillMail, killmailService } from "../../utils/KillmailService.ts";

interface Props {
  topCharacters: ITopKills[];
  topTribes: ITopKills[];
  topSolarSystems: ITopKills[];
  latest: IKillMail[];
}

export const handler: Handlers<Props> = {
  async GET(_, ctx) {
    const topCharacters = await killmailService.topCharacters();
    const topTribes = await killmailService.topTribes();
    const topSolarSystems = await killmailService.topSolarSystems();
    const latest = await killmailService.latest();

    return ctx.render({
      topCharacters,
      topTribes,
      topSolarSystems,
      latest,
    });
  },
};

export default function KillmailsOverviewPage(
  { data: { topCharacters, topTribes, topSolarSystems, latest } }: PageProps<
    Props
  >,
) {
  return (
    <section class="flex flex-col gap-y-8 items-center">
      <div class="grid grid-cols-3 gap-x-8 w-full justify-center">
        <TopKills results={topCharacters} category="Character" />

        <TopKills results={topTribes} category="Tribe" />

        <TopKills results={topSolarSystems} category="Solar System" />
      </div>

      <Killmails killmails={latest} />
    </section>
  );
}
