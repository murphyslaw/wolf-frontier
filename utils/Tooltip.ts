import { Instance, Props, ReferenceElement, Tippy } from "tippy.js";
import { createClipboardText } from "../islands/SolarSystemInGameLink.tsx";

interface CustomTippyInstance<T = Props> extends Instance<T> {
  "_error": Error | null;
  "_isFetching": boolean;
}

export class Tooltip {
  static ID = "tooltip-content";

  private loadingText = "Loading...";

  constructor(
    private tippy: Tippy,
    private tooltipUrlCallback: (reference: ReferenceElement) => string,
  ) {
    this.tippy(".tooltip", {
      arrow: false,
      allowHTML: true,
      content: this.loadingText,
      interactive: true,
      trigger: "click",
      maxWidth: "none",
      appendTo: this.appendTo(),
      onCreate: this.onCreate(),
      onShow: this.onShow(),
      onHidden: this.onHidden(),
    });
  }

  private appendTo(): () => Element {
    return () => document.body;
  }

  private onCreate(): (instance: CustomTippyInstance) => void {
    return function (instance) {
      instance._isFetching = false;
      instance._error = null;
    };
  }

  private onShow(): (instance: CustomTippyInstance) => void | false {
    const cb = this.tooltipUrlCallback;
    const hydrate = this.hydrate;

    return function (instance) {
      if (instance._isFetching || instance._error) {
        return;
      }

      instance._isFetching = true;

      const url = cb(instance.reference);

      fetch(url)
        .then((response) => response.text())
        .then((text) => {
          const parser = new DOMParser();

          const doc = parser.parseFromString(text, "text/html");
          let tooltipContent = doc.querySelector(`#${Tooltip.ID}`);

          if (tooltipContent) {
            // workaround for hydrating dynamically loaded island
            hydrate(tooltipContent);
          } else {
            tooltipContent = document.createElement("p");
            tooltipContent.appendChild(
              document.createTextNode(
                `Tooltip content missing. Does it have the correct Tooltip.ID? #${Tooltip.ID}`,
              ),
            );
          }

          instance.setContent(tooltipContent);
        }).catch((error) => {
          instance._error = error;
          instance.setContent(`Request failed. ${error}`);
        }).finally(() => {
          instance._isFetching = false;
        });
    };
  }

  private onHidden(): (instance: CustomTippyInstance) => void {
    const content = this.loadingText;

    return function (instance) {
      instance.setContent(content);
      instance._error = null;
    };
  }

  private hydrate(tooltipContent: Element) {
    const clipboardButton = tooltipContent.querySelector("button");

    if (clipboardButton) {
      const link = createClipboardText(
        Number(clipboardButton.dataset.id),
        String(clipboardButton.dataset.name),
      );

      clipboardButton.onclick = () => navigator.clipboard.writeText(link);
    }
  }
}
