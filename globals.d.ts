// deno-lint-ignore-file no-var

import type * as Popper from "@popperjs/core";
import type * as Tippy from "tippy.js";

export {};

declare global {
  var Popper: Popper.Obj;
  var tippy: Tippy.Tippy;
}
