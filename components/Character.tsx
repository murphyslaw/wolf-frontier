import { SmartCharacter } from "../utils/CharacterService.ts";
import { Border } from "./Border.tsx";
import { EveToken } from "./EveToken.tsx";
import { HeadingOne } from "./HeadingOne.tsx";
import { HeadingThree } from "./HeadingThree.tsx";
import { Tribe } from "./Tribe.tsx";

export function Character(props: { character: SmartCharacter }) {
  return (
    <div class="flex flex-row gap-4">
      <Border>
        <img
          src={props.character.image}
          width="124px"
          height="124px"
        />
      </Border>

      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-0">
          <HeadingThree>
            Player
          </HeadingThree>

          <HeadingOne>
            {props.character.name}
          </HeadingOne>

          <Tribe
            name={props.character.tribe}
            ticker={props.character.ticker_name}
          />
        </div>

        <EveToken balance={props.character.eve_balance} />
      </div>
    </div>
  );
}
