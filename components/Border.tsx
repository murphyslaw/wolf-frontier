import { JSX } from "preact";

export function Border(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      class="border"
    />
  );
}
