import { JSX } from "preact";

export function Heading(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h1
      {...props}
      class="uppercase font-headline font-normal text-white tracking-tighter text-6xl"
    />
  );
}
