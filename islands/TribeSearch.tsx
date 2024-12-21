interface Props {
  query: string;
}

export default function TribeSearch({ query }: Props) {
  return (
    <form
      action="/tribes"
      method="GET"
      class="flex flex-row gap-x-4"
    >
      <div class="bordered p-1">
        <input
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
  );
}
