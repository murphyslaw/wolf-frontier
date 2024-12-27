interface Props {
  killmailsPath: string;
  smartAssembliesPath: string;
  headquartersPath?: string;
  active: "killmails" | "smartassemblies" | "headquarters" | "none";
}

export function Tabs(
  { killmailsPath, smartAssembliesPath, headquartersPath, active }: Props,
) {
  return (
    <ul class="tabs bodyMedium">
      {headquartersPath && (
        <li>
          <button
            aria-current={active === "headquarters"}
            f-partial={headquartersPath}
          >
            <svg>
              <use href="/images/icons.svg#killreport" />
            </svg>

            Headquarters
          </button>
        </li>
      )}

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
