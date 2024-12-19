import { JSX } from "preact/jsx-runtime";

export default function LetterHighlight(
  props: JSX.HTMLAttributes<HTMLSpanElement>,
) {
  return <span {...props} class="text-orange" />;
}
