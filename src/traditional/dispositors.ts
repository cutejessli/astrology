import { NatalChart, Planet } from "../core";
import { getSignRuler } from "./rulerships";

export interface DispositorChainStep {
  planet: Planet;
  sign: string;
  dispositor: Planet;
}

export interface DispositorChain {
  startingPlanet: Planet;
  steps: DispositorChainStep[];
  finalDispositor?: Planet;
  loop?: Planet[];
}

export function buildDispositorChain(
  chart: NatalChart,
  startingPlanet: Planet,
  useModernRuler = true,
  maxSteps = 12
): DispositorChain {
  const steps: DispositorChainStep[] = [];
  const visited: Planet[] = [];
  let currentPlanet = startingPlanet;

  for (let i = 0; i < maxSteps; i++) {
    const currentPosition = chart.planets[currentPlanet];

    if (!currentPosition) {
      break;
    }

    const dispositor = getSignRuler(currentPosition.sign, useModernRuler);

    steps.push({
      planet: currentPlanet,
      sign: currentPosition.sign,
      dispositor,
    });

    if (dispositor === currentPlanet) {
      return {
        startingPlanet,
        steps,
        finalDispositor: currentPlanet,
      };
    }

    const existingIndex = visited.indexOf(dispositor);
    if (existingIndex !== -1) {
      return {
        startingPlanet,
        steps,
        loop: [...visited.slice(existingIndex), dispositor],
      };
    }

    visited.push(currentPlanet);
    currentPlanet = dispositor;
  }

  return {
    startingPlanet,
    steps,
  };
}

export function buildChartDispositorChains(
  chart: NatalChart,
  planets: Planet[] = ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn"],
  useModernRuler = true
): DispositorChain[] {
  return planets.map((planet) => buildDispositorChain(chart, planet, useModernRuler));
}

export function findFinalDispositors(chains: DispositorChain[]): Planet[] {
  const dispositors = chains
    .map((chain) => chain.finalDispositor)
    .filter((planet): planet is Planet => Boolean(planet));

  return Array.from(new Set(dispositors));
}

export function findDispositorLoops(chains: DispositorChain[]): Planet[][] {
  return chains
    .map((chain) => chain.loop)
    .filter((loop): loop is Planet[] => Boolean(loop));
}
