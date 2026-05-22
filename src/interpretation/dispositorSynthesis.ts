import { NatalChart, Planet } from "../core";
import {
  buildChartDispositorChains,
  DispositorChain,
  findDispositorLoops,
  findFinalDispositors,
} from "../traditional/dispositors";
import { planetMeanings } from "./planets";

export interface DispositorInterpretationSection {
  title: string;
  body: string;
  keywords: string[];
  weight: number;
  chains: DispositorChain[];
}

export function interpretDispositors(chart: NatalChart): DispositorInterpretationSection | undefined {
  const chains = buildChartDispositorChains(chart);
  const finalDispositors = findFinalDispositors(chains);
  const loops = findDispositorLoops(chains);

  if (finalDispositors.length === 0 && loops.length === 0) {
    return undefined;
  }

  const title = createTitle(finalDispositors, loops);
  const body = createBody(finalDispositors, loops, chains);

  return {
    title,
    body,
    keywords: unique([
      "dispositor",
      "rulership chain",
      "chart hierarchy",
      "planetary network",
      ...finalDispositors.flatMap((planet) => planetMeanings[planet]?.keywords.slice(0, 2) ?? []),
    ]),
    weight: finalDispositors.length > 0 ? 4.7 : 4.2,
    chains,
  };
}

function createTitle(finalDispositors: Planet[], loops: Planet[][]): string {
  if (finalDispositors.length > 0) {
    return `Dispositor Pattern — Final Dispositor ${finalDispositors.map(formatPlanet).join(", ")}`;
  }

  return `Dispositor Pattern — Planetary Loop ${loops[0]?.map(formatPlanet).join(" ↔ ") ?? "Detected"}`;
}

function createBody(
  finalDispositors: Planet[],
  loops: Planet[][],
  chains: DispositorChain[]
): string {
  const intro =
    "Dispositor chains show how planets answer to the rulers of the signs they occupy. This reveals the chart as a living command structure: one planet's expression may route through another planet before it fully manifests.";

  const finalText =
    finalDispositors.length > 0
      ? ` In this chart, ${finalDispositors.map(formatPlanet).join(", ")} act${
          finalDispositors.length === 1 ? "s" : ""
        } as final dispositor${finalDispositors.length === 1 ? "" : "s"}, concentrating several planetary pathways into a central archetypal intelligence.`
      : "";

  const finalMeaning = finalDispositors
    .map((planet) => {
      const meaning = planetMeanings[planet];
      return meaning
        ? `${formatPlanet(planet)} emphasizes ${lowerFirst(meaning.coreMeaning)}`
        : undefined;
    })
    .filter(Boolean)
    .join(" ");

  const loopText =
    loops.length > 0
      ? ` The chart also contains dispositor loop${loops.length === 1 ? "" : "s"}: ${loops
          .map((loop) => loop.map(formatPlanet).join(" ↔ "))
          .join("; ")}. A loop suggests mutual dependency, where planetary energies feed each other rather than resolving into one final ruler.`
      : "";

  const exampleChains = chains
    .slice(0, 3)
    .map((chain) => `${formatPlanet(chain.startingPlanet)}: ${chain.steps.map((step) => `${formatPlanet(step.planet)} in ${step.sign} → ${formatPlanet(step.dispositor)}`).join("; ")}`)
    .join(" ");

  return `${intro}${finalText} ${finalMeaning}${loopText} Example chains: ${exampleChains}`;
}

function formatPlanet(planet: Planet): string {
  return planet.charAt(0).toUpperCase() + planet.slice(1);
}

function lowerFirst(value: string): string {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values));
}
