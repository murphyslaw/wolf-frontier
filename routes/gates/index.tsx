import Map from "../../islands/Map.tsx";
import { D3Provider } from "../../islands/providers/D3Provider.tsx";
import { PopperProvider } from "../../islands/providers/PopperProvider.tsx";
import { TippyProvider } from "../../islands/providers/TippyProvider.tsx";
import { mapService } from "../../utils/MapService.ts";
import {
  ISolarSystem,
  ISolarSystemLink,
} from "../../utils/SolarSystemService.ts";

export default async function defineRoute() {
  const smartGateLinkRecords = await mapService.gates();

  const nodes: Pick<ISolarSystem, "id" | "name">[] = [];
  const links: ISolarSystemLink[] = [];

  const preventDuplicates = new Set();

  for (const record of smartGateLinkRecords) {
    if (!preventDuplicates.has(record.source)) {
      nodes.push({
        id: record.source,
        name: record.source_name,
      });

      preventDuplicates.add(record.source);
    }

    if (!preventDuplicates.has(record.target)) {
      nodes.push({
        id: record.target,
        name: record.target_name,
      });

      preventDuplicates.add(record.target);
    }

    if (
      !preventDuplicates.has(`${record.source}-${record.target}`) &&
      !preventDuplicates.has(`${record.target}-${record.source}`)
    ) {
      links.push({
        source: record.source,
        target: record.target,
        smartGate: record.gate,
        distance: 60,
      });

      preventDuplicates.add(`${record.source}-${record.target}`);
      preventDuplicates.add(`${record.target}-${record.source}`);
    }
  }

  return (
    <D3Provider>
      <PopperProvider>
        <TippyProvider>
          <Map nodes={nodes} links={links} />
        </TippyProvider>
      </PopperProvider>
    </D3Provider>
  );
}
