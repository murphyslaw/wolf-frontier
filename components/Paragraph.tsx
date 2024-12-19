import { JSX } from "preact";

export function Paragraph(props: JSX.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      class="font-body font-[200] text-[15px] text-white"
    />
  );
}
