import { JSX } from "preact";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <div class="py-2 px-6 w-fit text-center transition-all duration-300 bg-[length:200%_100%] bg-right-bottom hover:bg-left-bottom bg-gradient-to-l from-orange from-50% to-white to-50% cursor-pointer">
      <button
        {...props}
        class="text-black font-headline text-sm uppercase no-underline"
      />
    </div>
  );
}
