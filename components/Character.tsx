import { ICharacter } from "../utils/CharacterService.ts";
import { BlockchainLink } from "./BlockchainLink.tsx";
import { EveToken } from "./EveToken.tsx";

export function Character(props: { character: ICharacter }) {
  const isOfficer = props.character.officer;

  return (
    <div class="flex flex-row gap-4">
      <div class="bordered p-2">
        <img
          src={props.character.image}
          width="124px"
          height="124px"
        />

        {isOfficer && (
          <img
            src="/images/officer_badge.png"
            class="absolute -bottom-4 -right-4 z-10"
            width="30"
            height="30"
            title="Officer"
          />
        )}
      </div>

      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-0">
          <div class="w-full flex flex-row items-center justify-between">
            <label class="labelLarge text-grayLight">
              Player
            </label>

            <BlockchainLink
              path={`smartcharacters/${props.character.address}`}
            />
          </div>

          <h1 class="headlineLarge">
            {props.character.name}
          </h1>

          <a
            href={`/tribes/${props.character.tribe_id}`}
            class="bodyMedium inverted"
          >
            {props.character.tribe} [{props.character.ticker}]
          </a>
        </div>

        <EveToken balance={props.character.eve_balance} />
      </div>
    </div>
  );
}
