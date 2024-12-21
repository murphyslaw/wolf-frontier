interface Props {
  query: string;
}

export default function CharacterSearch({ query }: Props) {
  return (
    <form
      action="/characters/results"
      method="GET"
      class="flex flex-row gap-x-4"
    >
      <div class="bordered p-1">
        <input
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
  );
}
