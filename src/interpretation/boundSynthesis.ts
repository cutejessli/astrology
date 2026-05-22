import { NatalChart, Planet } from "../core";
import { assessBound, BoundAssessment } from "../traditional/bounds";
import { planetMeanings } from "./planets";

export interface BoundInterpretationSection {
  title: string;
  body: string;
  keywords: string[];
  weight: number;
  assessment: BoundAssessment;
}

export function interpretPlanetBound(
  chart: NatalChart,
  planet: Planet
): BoundInterpretationSection {
  const position = chart.planets[planet];
  const assessment = assessBound(position);
  const planetMeaning = planetMeanings[planet];
  const planetName = formatPlanet(planet);
  const rulerName = formatPlanet(assessment.ruler);

  return {
    title: `${planetName} in ${assessment.sign} Bound — ${rulerName} Stewardship`,
    body: `${planetName} falls within the ${rulerName} bound of ${assessment.sign}, covering ${assessment.range.start}°–${assessment.range.end}°. Bounds add a fine-grained dignity layer, describing the steward or manager of a planet's exact degree. Here, ${rulerName} brings the tone of ${assessment.theme}. This does not replace the planet's sign meaning; it subtly conditions how ${lowerFirst(planetMeaning.coreMeaning)} finds its channel of expression.`,
    keywords: unique([
      "bound",
      "term",
      "degree dignity",
      assessment.ruler,
      ...assessment.keywords,
      ...planetMeaning.keywords.slice(0, 2),
    ]),
    weight: boundWeight(planet),
    assessment,
  };
}

export function interpretChartBounds(
  chart: NatalChart,
  planets: Planet[] = ["sun", "moon", "mercury", "venus", "mars"]
): BoundInterpretationSection[] {
  return planets
    .map((planet) => interpretPlanetBound(chart, planet))
    .sort((a, b) => b.weight - a.weight);
}

function boundWeight(planet: Planet): number {
  const weights: Record<Planet, number> = {
    sun: 2.9,
    moon: 2.8,
    mercury: 2.4,
    venus: 2.3,
    mars: 2.3,
    jupiter: 2.0,
    saturn: 2.0,
    uranus: 1.2,
    neptune: 1.2,
    pluto: 1.2,
  };

  return weights[planet];
}

function formatPlanet(planet: string): string {
  return planet.charAt(0).toUpperCase() + planet.slice(1);
}

function lowerFirst(value: string): string {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values));
}
