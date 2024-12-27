interface Props {
  killmailsPath: string;
  smartAssembliesPath: string;
  active: "killmails" | "smartassemblies" | "none";
}

export function Tabs({ killmailsPath, smartAssembliesPath, active }: Props) {
  return (
    <ul class="tabs bodyMedium">
      <li>
        <button
          aria-current={active === "killmails"}
          f-partial={killmailsPath}
        >
          <svg>
            <use href="/images/icons.svg#killreport" />
          </svg>

          Killmails
        </button>
      </li>

      <li>
        <button
          aria-current={active === "smartassemblies"}
          f-partial={smartAssembliesPath}
        >
          <svg>
            <use href="/images/icons.svg#smartassembly" />
          </svg>

          Smart Assemblies
        </button>
      </li>
    </ul>
  );
}
