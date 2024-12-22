import { ICharacter } from "../utils/CharacterService.ts";
import { ITribe } from "../utils/TribeService.ts";
import { CharacterCompact } from "./CharacterCompact.tsx";

export function Tribe(props: { tribe: ITribe; members: ICharacter[] }) {
  const ceo = props.members.find((member) =>
    member.address === props.tribe.ceo
  );
  const founder = props.members.find((member) =>
    member.address === props.tribe.founder
  );

  return (
    <div class="flex flex-col gap-4 w-full">
      <div>
        <h2 class="headlineLarge">
          {props.tribe.name} [{props.tribe.ticker}]
        </h2>

        <label class="labelLarge text-grayLight">
          Member Count: {props.tribe.count}
        </label>
      </div>

      <div class="flex flex-wrap gap-4">
        {props.members.map((member) => (
          <CharacterCompact key={member.address} character={member} />
        ))}
      </div>

      <div class="grid grid-cols-2 w-2/3 mx-auto mt-8">
        <section class="flex flex-col gap-y-4">
          <h2 class="titleMedium">Info</h2>

          <ul class="bulletList bodyMedium">
            <li>
              ID: {props.tribe.id}
            </li>

            {founder && (
              <li>
                FOUNDER:{" "}
                <a href={`/characters/${founder.address}`}>{founder.name}</a>
              </li>
            )}

            {ceo && (
              <li>
                CEO: <a href={`/characters/${ceo.address}`}>{ceo.name}</a>
              </li>
            )}

            {props.tribe.url && (
              <li>
                URL: <a href={props.tribe.url}>{props.tribe.url}</a>
              </li>
            )}
          </ul>
        </section>

        <section>
          <h2 class="titleMedium">Smart Assemblies</h2>
        </section>
      </div>
    </div>
  );
}
