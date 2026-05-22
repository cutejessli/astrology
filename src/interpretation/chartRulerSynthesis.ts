import { NatalChart } from "../core";
import { assessChartRuler, ChartRulerAssessment } from "../traditional/chartRuler";
import { planetMeanings } from "./planets";
import { signMeanings } from "./signs";
import { houseMeanings } from "./houses";

export interface ChartRulerInterpretationSection {
  title: string;
  body: string;
  keywords: string[];
  weight: number;
  assessment: ChartRulerAssessment;
}

export function interpretChartRuler(chart: NatalChart): ChartRulerInterpretationSection | undefined {
  const assessment = assessChartRuler(chart);

  if (!assessment) {
    return undefined;
  }

  const planetMeaning = planetMeanings[assessment.chartRuler];
  const signMeaning = signMeanings[assessment.chartRulerSign];
  const houseMeaning = assessment.chartRulerHouse ? houseMeanings[assessment.chartRulerHouse] : undefined;
  const planetName = formatPlanet(assessment.chartRuler);

  const title = `Chart Ruler — ${planetName} in ${assessment.chartRulerSign}${
    houseMeaning ? ` in ${houseMeaning.title}` : ""
  }`;

  const houseText = houseMeaning
    ? ` Because it falls in ${houseMeaning.title.toLowerCase()}, this guiding planet expresses through ${houseMeaning.lifeArea.toLowerCase()}.`
    : "";

  const body = [
    `${assessment.notes.join(" ")}`,
    `As chart ruler, ${planetName} acts like a steering planet for the whole chart: it colors how the person meets life, initiates experience, and returns to their own center.`,
    `${planetName} carries the core meaning of ${lowerFirst(planetMeaning.coreMeaning)}`,
    `In ${assessment.chartRulerSign}, that guiding intelligence moves through the archetype of ${lowerFirst(signMeaning.coreArchetype)}`,
    houseText,
    `Its planetary condition is ${assessment.dignity.dignity}, which adds this nuance: ${assessment.dignity.notes.join(" ")}`,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    title,
    body,
    keywords: unique([
      "chart ruler",
      "ascendant",
      "guiding planet",
      ...planetMeaning.keywords.slice(0, 3),
      ...signMeaning.keywords.slice(0, 2),
      ...(houseMeaning ? houseMeaning.keywords.slice(0, 2) : []),
    ]),
    weight: 5.5,
    assessment,
  };
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
