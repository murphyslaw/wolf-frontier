export interface ITopKills {
  href: string;
  name: string;
  count: number;
}

export type ITopKillsCategory = "Character" | "Tribe" | "Solar System";

export function TopKills(
  { results, category }: { results: ITopKills[]; category: ITopKillsCategory },
) {
  return (
    <div class="flex flex-col gap-y-8">
      <h2 class="headlineLarge">Top {category}s</h2>

      <table class="w-full bodyMedium">
        <thead>
          <tr>
            <th class="text-left">{category}</th>

            <th>Kills</th>
          </tr>
        </thead>

        <tbody>
          {results.map((result) => (
            <tr>
              <td>
                <a href={result.href}>{result.name || "unknown"}</a>
              </td>

              <td class="text-center">{result.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
