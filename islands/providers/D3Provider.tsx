import { IS_BROWSER } from "$fresh/runtime.ts";
import type * as D3 from "https://esm.sh/v135/@types/d3@7.4.3/index.d.ts";
import { ComponentChildren, createContext } from "preact";
import { useState } from "preact/hooks";

export const D3Context = createContext<typeof D3 | null>(null);

export function D3Provider(props: { children: ComponentChildren }) {
  if (!IS_BROWSER) return null;

  const [d3, setD3] = useState<typeof D3 | null>(null);

  return (
    <>
      <script
        defer
        onLoad={() => setD3(() => globalThis.d3)}
        src="https://cdn.jsdelivr.net/npm/d3@7"
      />

      <D3Context.Provider value={d3}>
        {props.children}
      </D3Context.Provider>
    </>
  );
}
