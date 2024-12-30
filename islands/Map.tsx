import type * as D3 from "https://esm.sh/v135/@types/d3@7.4.3/index.d.ts";
import { useContext, useEffect, useRef } from "preact/hooks";
import { Props as TippyProps, Tippy } from "tippy.js";
import tailwindConfig from "../tailwind.config.ts";
import { Tooltip } from "../utils/Tooltip.ts";
import { D3Context } from "./providers/D3Provider.tsx";
import { PopperContext } from "./providers/PopperProvider.tsx";
import { TippyContext } from "./providers/TippyProvider.tsx";

interface NodeDatum extends D3.SimulationNodeDatum {
  id: number;
  name: string;
}

function isNodeDatum(object: unknown): object is NodeDatum {
  return (object as NodeDatum).x !== undefined &&
    (object as NodeDatum).y !== undefined;
}

interface LinkDatum extends D3.SimulationLinkDatum<NodeDatum> {
  source: number | NodeDatum;
  target: number | NodeDatum;
  distance: number;
  smartGate: boolean;
}

function JsLibraryLoadingError(library: string) {
  return (
    <div>
      Unable to access {library} JS. Try to reload without browser cache.
    </div>
  );
}

interface Props {
  nodes: NodeDatum[];
  links: LinkDatum[];
}

export default function Map(props: Props) {
  const d3 = useContext(D3Context);
  const popper = useContext(PopperContext);
  const tippy = useContext(TippyContext);

  if (!d3) return JsLibraryLoadingError("D3");
  if (!popper) return JsLibraryLoadingError("Popper");
  if (!(typeof tippy === "function")) return JsLibraryLoadingError("Tippy");

  const container = useRef<HTMLDivElement>(null);

  const width = 2000;
  const height = 1500;

  // The force simulation mutates links and nodes, so create a copy
  // so that re-evaluating this cell produces the same result.
  const links = props.links.map((d) => ({ ...d }));
  const nodes = props.nodes.map((d) => ({ ...d }));

  const simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-700))
    .force(
      "link",
      d3.forceLink<NodeDatum, LinkDatum>(links).id((d) => d.id)
        .distance((d) => d.smartGate ? d.distance * 2 : d.distance),
    )
    .force("x", d3.forceX())
    .force("y", d3.forceY());

  const svg = d3.create("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
    .attr("class", "bodyMedium text-white")
    .attr("style", "max-width: 100%; height: auto;");

  const link = svg.append("g")
    .attr("fill", "none")
    .selectAll("line")
    .data(links)
    .join("line")
    .attr(
      "stroke",
      (d) =>
        d.smartGate
          ? tailwindConfig.theme.extend.colors.green["600"]
          : tailwindConfig.theme.extend.colors.grayLight,
    )
    .attr("stroke-width", (d) => d.smartGate ? 3 : 1.5);

  const node = svg.append("g")
    .attr("fill", tailwindConfig.theme.extend.colors.gray)
    .selectAll("g")
    .data(nodes)
    .join("g")
    .attr("class", "tooltip")
    .call(d3.drag);

  node.append("circle")
    .attr("stroke", tailwindConfig.theme.extend.colors.white)
    .attr("stroke-width", 1.5)
    .attr("r", 10);

  node.append("text")
    .attr("x", 15)
    .attr("y", "0.31em")
    .attr("fill", tailwindConfig.theme.extend.colors.white)
    .text((d) => d.name)
    .clone(true).lower()
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 2);

  simulation.on("tick", () => {
    link
      .attr("x1", (d) => isNodeDatum(d.source) ? d.source.x || 0 : 0)
      .attr("y1", (d) => isNodeDatum(d.source) ? d.source.y || 0 : 0)
      .attr("x2", (d) => isNodeDatum(d.target) ? d.target.x || 0 : 0)
      .attr("y2", (d) => isNodeDatum(d.target) ? d.target.y || 0 : 0);

    node.attr("transform", (d) => `translate(${d.x},${d.y})`);
  });

  const map = svg.node() ||
    document.createTextNode("unable to create SVG node");

  useEffect(() => {
    container.current?.append(map);

    new Tooltip(tippy as unknown as Tippy<TippyProps>, (reference) => {
      const node = d3.select(reference).datum() as NodeDatum;
      const url = `/partials/map/tooltip/${node.id}`;

      return url;
    });
  });

  return <div ref={container} id="container" />;
}
