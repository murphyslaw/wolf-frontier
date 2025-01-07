import { Handlers, PageProps } from "$fresh/server.ts";
import { Killmails } from "../../components/Killmails.tsx";
import { ITopKills, TopKills } from "../../components/TopKills.tsx";
import { IKillMail, killmailService } from "../../utils/KillmailService.ts";

interface Props {
  topCharacters: ITopKills[];
  topTribes: ITopKills[];
  topSolarSystems: ITopKills[];
  killmails: IKillMail[];
}

export const handler: Handlers<Props> = {
  async GET(_, ctx) {
    const topCharacters = await killmailService.topCharacters();
    const topTribes = await killmailService.topTribes();
    const topSolarSystems = await killmailService.topSolarSystems();
    const killmails = await killmailService.latest();

    return ctx.render({
      topCharacters,
      topTribes,
      topSolarSystems,
      killmails,
    });
  },
};

export default function KillmailsOverviewPage(
  { data: { topCharacters, topTribes, topSolarSystems, killmails } }: PageProps<
    Props
  >,
) {
  return (
    <section class="flex flex-col gap-y-8 items-center">
      <div class="flex flex-wrap gap-8 w-full">
        <TopKills results={topCharacters} category="Character" />

        <TopKills results={topTribes} category="Tribe" />

        <TopKills results={topSolarSystems} category="Solar System" />
      </div>

      <div class="flex flex-col gap-y-8">
        <h2 class="headlineLarge">Most recent kills ({killmails.length})</h2>

        <Killmails killmails={killmails} />
      </div>
    </section>
  );
}
