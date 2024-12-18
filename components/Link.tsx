import { JSX } from "preact";

export function Link(props: JSX.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      class="uppercase font-headline font-normal text-white hover:text-orange tracking-widest leading-4 text-sm"
    />
  );
}
