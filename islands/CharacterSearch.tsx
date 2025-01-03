interface Props {
  query: string;
  total: number;
}

export default function CharacterSearch({ query, total }: Props) {
  return (
    <div class="flex flex-col gap-y-1">
      <p class="labelSmall text-grayLight">Total: {total}</p>

      <form
        action="/characters"
        method="GET"
        class="flex flex-row gap-x-4"
      >
        <div class="bordered p-1">
          <input
            autofocus
            type="search"
            id="character-search"
            name="query"
            placeholder="Character name..."
            value={query}
            class="text-white bg-transparent bodyMedium p-2"
          />
        </div>

        <button type="submit">
          <img src="/images/searchmagnifyingglass.svg" />
        </button>
      </form>
    </div>
  );
}
