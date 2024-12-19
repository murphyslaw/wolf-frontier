import { JSX } from "preact";
import { ButtonContainer } from "./ButtonContainer.tsx";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <ButtonContainer>
      <button
        {...props}
      />
    </ButtonContainer>
  );
}
