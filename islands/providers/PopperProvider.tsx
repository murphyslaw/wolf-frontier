import { IS_BROWSER } from "$fresh/runtime.ts";
import type * as Popper from "@popperjs/core";
import { ComponentChildren, createContext } from "preact";
import { useState } from "preact/hooks";

export const PopperContext = createContext<Popper.Obj | null>(null);

export function PopperProvider(props: { children: ComponentChildren }) {
  if (!IS_BROWSER) return null;

  const [popper, setPopper] = useState<Popper.Obj | null>(null);

  return (
    <>
      <script
        defer
        onLoad={() => setPopper(() => globalThis.Popper)}
        src="https://unpkg.com/@popperjs/core@2"
      />

      <PopperContext.Provider value={popper}>
        {props.children}
      </PopperContext.Provider>
    </>
  );
}
