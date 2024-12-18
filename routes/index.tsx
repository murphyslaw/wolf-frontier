import { Button } from "../components/Button.tsx";
import { Heading } from "../components/Heading.tsx";
import { Link } from "../components/Link.tsx";

export default function Home() {
  return (
    <div
      class="px-4 py-8 mx-auto bg-no-repeat bg-cover h-screen flex flex-col gap-y-10"
      style="background-image: url('/images/gate_bg-3840x2160.png')"
    >
      <Heading>
        <span class="text-orange">W</span>andering<br />
        <span class="text-orange">O</span>rder of the<br />
        <span class="text-orange">L</span>ast<br />
        <span class="text-orange">F</span>rontier
      </Heading>

      <p class="font-body font-[200] text-[15px] text-white w-1/3">
        This is an <Link href="https://www.evefrontier.com/">EVE Frontier</Link>
        {" "}
        fanpage. EVE Frontier is a trademark of CCP ehf. All rights reserved. By
        entering, you agree to adhere to the{" "}
        <Link href="https://www.evefrontier.com/en/nda">
          NDA & Disclaimers
        </Link>.
      </p>

      <Button>Enter</Button>
    </div>
  );
}
