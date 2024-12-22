interface Props {
  query: string;
  total: number;
}

export default function TribeSearch({ query, total }: Props) {
  return (
    <div class="flex flex-col gap-y-1">
      <p class="labelSmall text-grayLight">Total: {total}</p>
      <form
        action="/tribes"
        method="GET"
        class="flex flex-row gap-x-4"
      >
        <div class="bordered p-1">
          <input
            autofocus
            type="search"
            id="tribe-search"
            name="query"
            placeholder="Tribe name or id..."
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
