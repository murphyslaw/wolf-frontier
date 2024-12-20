import { characterService, SmartCharacter } from "../utils/CharacterService.ts";

export function CharacterCompact(props: { character: SmartCharacter }) {
  const isOfficer = characterService.isOfficer(props.character.name);

  return (
    <a
      href={`/characters/${props.character.address}`}
      class="bordered transition-all hover:text-orange hover:border-orange"
    >
      {isOfficer && (
        <img
          src="/images/officer_badge.png"
          class="absolute -bottom-2 -right-2 z-10"
          width="20"
          height="20"
          title="Officer"
        />
      )}

      <div class="flex flex-row gap-2 p-2 items-center">
        <img
          src={props.character.image}
          width="24px"
          height="24px"
        />

        <h3 class="titleMedium">
          {props.character.name}
        </h3>
      </div>
    </a>
  );
}
