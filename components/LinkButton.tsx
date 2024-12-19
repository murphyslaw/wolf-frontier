import { JSX } from "preact";
import { ButtonContainer } from "./ButtonContainer.tsx";

export function LinkButton(props: JSX.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <ButtonContainer>
      <a
        {...props}
      />
    </ButtonContainer>
  );
}
