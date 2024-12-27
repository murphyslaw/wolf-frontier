import { Partial } from "$fresh/runtime.ts";
import { FreshContext } from "$fresh/server.ts";
import { Character } from "../../components/Character.tsx";
import { Tabs } from "../../components/Tabs.tsx";
import { characterService } from "../../utils/CharacterService.ts";

export default async function CharacterDetailsPage(
  _req: Request,
  ctx: FreshContext,
) {
  const address = ctx.params.address;
  const character = await characterService.get(address);

  if (!character) {
    return ctx.renderNotFound();
  }

  return (
    <>
      <Character character={character} />

      <div
        f-client-nav
      >
        <Partial name={`character-tab-content`}>
          <Tabs
            killmailsPath={`/partials/character-tabs/killmails/${character.address}`}
            smartAssembliesPath={`/partials/character-tabs/smartassemblies/${character.address}`}
            active="none"
          />
        </Partial>
      </div>
    </>
  );
}
