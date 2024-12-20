import { JSX } from "preact";

export function LinkButton(props: JSX.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <div class="buttonContainer">
      <a
        {...props}
        class="hover:text-inherit"
      />
    </div>
  );
}
