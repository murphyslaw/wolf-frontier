interface Props {
  id: number;
  name: string;
}

export function createClipboardText(id: number, name: string): string {
  return `<a href="showinfo:5//${id}">${name}</a>`;
}

export function SolarSystemInGameLink({ id, name }: Props) {
  const link = createClipboardText(id, name);

  function onClickHandler() {
    navigator.clipboard.writeText(link);
  }

  return (
    <button
      class="clipboard"
      title="copy solar system in game link to clipboard"
      data-id={id}
      data-name={name}
      onClick={onClickHandler}
    >
      <svg>
        <use href="/images/icons.svg#clipboard" />
      </svg>
    </button>
  );
}
