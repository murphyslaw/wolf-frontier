import { FreshContext } from "$fresh/server.ts";
import { HeadingOne } from "../../components/HeadingOne.tsx";
import { Paragraph } from "../../components/Paragraph.tsx";
import { characterService } from "../../utils/CharacterService.ts";

export default async function Characters(_req, ctx: FreshContext) {
  const result = await characterService.count();

  return (
    <>
      <HeadingOne>
        Smart Characters
      </HeadingOne>

      <pre>
        {result}
      </pre>

      <Paragraph>
        test a fasd lfajds lfjasd lfkjasdl kfjalsdk jfalsdj flajsd flakjs
        lfjadslf jfalsdja flköasf test a fasd lfajds lfjasd lfkjasdl kfjalsdk
        jfalsdj flajsd flakjs lfjadslf jfalsdja flköasf test a fasd lfajds
        lfjasd lfkjasdl kfjalsdk jfalsdj flajsd flakjs lfjadslf jfalsdja flköasf
        test a fasd lfajds lfjasd lfkjasdl kfjalsdk jfalsdj flajsd flakjs
        lfjadslf jfalsdja flköasf test a fasd lfajds lfjasd lfkjasdl kfjalsdk
        jfalsdj flajsd flakjs lfjadslf jfalsdja flköasf test a fasd lfajds
        lfjasd lfkjasdl kfjalsdk jfalsdj flajsd flakjs lfjadslf jfalsdja flköasf
        test a fasd lfajds lfjasd lfkjasdl kfjalsdk jfalsdj flajsd flakjs
        lfjadslf jfalsdja flköasf test a fasd lfajds lfjasd lfkjasdl kfjalsdk
        jfalsdj flajsd flakjs lfjadslf jfalsdja flköasf test a fasd lfajds
        lfjasd lfkjasdl kfjalsdk jfalsdj flajsd flakjs lfjadslf jfalsdja flköasf
        test a fasd lfajds lfjasd lfkjasdl kfjalsdk jfalsdj flajsd flakjs
        lfjadslf jfalsdja flköasf test a fasd lfajds lfjasd lfkjasdl kfjalsdk
        jfalsdj flajsd flakjs lfjadslf jfalsdja flköasf test a fasd lfajds
        lfjasd lfkjasdl kfjalsdk jfalsdj flajsd flakjs lfjadslf jfalsdja flköasf
        test a fasd lfajds lfjasd lfkjasdl kfjalsdk jfalsdj flajsd flakjs
        lfjadslf jfalsdja flköasf test a fasd lfajds lfjasd lfkjasdl kfjalsdk
        jfalsdj flajsd flakjs lfjadslf jfalsdja flköasf test a fasd lfajds
        lfjasd lfkjasdl kfjalsdk jfalsdj flajsd flakjs lfjadslf jfalsdja flköasf
        test a fasd lfajds lfjasd lfkjasdl kfjalsdk jfalsdj flajsd flakjs
        lfjadslf jfalsdja flköasf test a fasd lfajds lfjasd lfkjasdl kfjalsdk
        jfalsdj flajsd flakjs lfjadslf jfalsdja flköasf test a fasd lfajds
        lfjasd lfkjasdl kfjalsdk jfalsdj flajsd flakjs lfjadslf jfalsdja flköasf
        test a fasd lfajds lfjasd lfkjasdl kfjalsdk jfalsdj flajsd flakjs
        lfjadslf jfalsdja flköasf test a fasd lfajds lfjasd lfkjasdl kfjalsdk
        jfalsdj flajsd flakjs lfjadslf jfalsdja flköasf test a fasd lfajds
        lfjasd lfkjasdl kfjalsdk jfalsdj flajsd flakjs lfjadslf jfalsdja flköasf
        test a fasd lfajds lfjasd lfkjasdl kfjalsdk jfalsdj flajsd flakjs
        lfjadslf jfalsdja flköasf test a fasd lfajds lfjasd lfkjasdl kfjalsdk
        jfalsdj flajsd flakjs lfjadslf jfalsdja flköasf
      </Paragraph>
    </>
  );
}
