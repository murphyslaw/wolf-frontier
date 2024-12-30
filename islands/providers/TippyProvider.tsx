import { IS_BROWSER } from "$fresh/runtime.ts";
import { ComponentChildren, createContext } from "preact";
import { useState } from "preact/hooks";
import type * as Tippy from "tippy.js";

export const TippyContext = createContext<Tippy.Tippy | null>(null);

export function TippyProvider(props: { children: ComponentChildren }) {
  if (!IS_BROWSER) return null;

  const [tippy, setTippy] = useState<Tippy.Tippy | null>(null);

  return (
    <>
      <script
        defer
        onLoad={() => setTippy(() => globalThis.tippy)}
        src="https://unpkg.com/tippy.js@6"
      />

      <TippyContext.Provider value={tippy}>
        {props.children}
      </TippyContext.Provider>
    </>
  );
}
