import { JSX } from "preact";

export function HeadingThree(props: JSX.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      {...props}
      class="uppercase font-headline font-bold text-grayLight tracking-wider text-2xs"
    />
  );
}
