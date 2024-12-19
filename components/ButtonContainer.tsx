import { JSX } from "preact";

export function ButtonContainer(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      class="py-2 px-6 w-fit text-center text-black font-headline text-sm uppercase no-underline transition-all duration-300 bg-[length:200%_100%] bg-right-bottom hover:bg-left-bottom bg-gradient-to-l from-orange from-50% to-white to-50% cursor-pointer"
    />
  );
}
