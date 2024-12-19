import { JSX } from "preact";

export function HeadingTwo(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      {...props}
      class="uppercase font-headline font-normal text-white tracking-tighter text-3xl"
    />
  );
}
