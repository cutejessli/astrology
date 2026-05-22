import { NatalChart, Planet } from "../core";
import { assessDecan, DecanAssessment } from "../traditional/decans";
import { planetMeanings } from "./planets";

export interface DecanInterpretationSection {
  title: string;
  body: string;
  keywords: string[];
  weight: number;
  assessment: DecanAssessment;
}

export function interpretPlanetDecan(
  chart: NatalChart,
  planet: Planet
): DecanInterpretationSection {
  const position = chart.planets[planet];
  const assessment = assessDecan(position);
  const planetMeaning = planetMeanings[planet];
  const planetName = formatPlanet(planet);
  const rulerName = formatPlanet(assessment.traditionalRuler);

  return {
    title: `${planetName} in ${assessment.sign} Decan ${assessment.decan} — ${rulerName} Subtone`,
    body: `${planetName} is placed in the ${ordinal(assessment.decan)} decan of ${assessment.sign}, giving this placement a ${rulerName} subtone. The core theme here is ${assessment.theme}. This modifies the planet's expression by adding a finer symbolic texture beneath the sign itself. ${planetName} already speaks through ${lowerFirst(planetMeaning.coreMeaning)} With the decan layer, that expression becomes more specific, showing how the planet's energy is shaped by a deeper sub-ruler and a more precise spiritual atmosphere.`,
    keywords: unique([
      "decan",
      "degree layer",
      assessment.sign.toLowerCase(),
      assessment.traditionalRuler,
      ...assessment.keywords,
      ...planetMeaning.keywords.slice(0, 2),
    ]),
    weight: decanWeight(planet),
    assessment,
  };
}

export function interpretChartDecans(
  chart: NatalChart,
  planets: Planet[] = ["sun", "moon", "mercury", "venus", "mars"]
): DecanInterpretationSection[] {
  return planets
    .map((planet) => interpretPlanetDecan(chart, planet))
    .sort((a, b) => b.weight - a.weight);
}

function decanWeight(planet: Planet): number {
  const weights: Record<Planet, number> = {
    sun: 3.2,
    moon: 3.1,
    mercury: 2.6,
    venus: 2.4,
    mars: 2.4,
    jupiter: 2.0,
    saturn: 2.0,
    uranus: 1.5,
    neptune: 1.5,
    pluto: 1.5,
  };

  return weights[planet];
}

function formatPlanet(planet: string): string {
  return planet.charAt(0).toUpperCase() + planet.slice(1);
}

function ordinal(value: number): string {
  const labels: Record<number, string> = {
    1: "first",
    2: "second",
    3: "third",
  };

  return labels[value] ?? `${value}th`;
}

function lowerFirst(value: string): string {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values));
}
