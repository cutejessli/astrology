import { NatalChart } from "../core";
import {
  assessHouseRulers,
  HouseRulerAssessment,
} from "../traditional/houseRulers";
import { houseMeanings } from "./houses";
import { planetMeanings } from "./planets";

export interface HouseRulerInterpretationSection {
  title: string;
  body: string;
  keywords: string[];
  weight: number;
  assessment: HouseRulerAssessment;
}

export function interpretHouseRulers(
  chart: NatalChart,
  housesToHighlight: number[] = [1, 4, 7, 8, 10, 12]
): HouseRulerInterpretationSection[] {
  return assessHouseRulers(chart)
    .filter((assessment) => housesToHighlight.includes(assessment.house))
    .map(interpretHouseRuler)
    .sort((a, b) => b.weight - a.weight);
}

export function interpretHouseRuler(
  assessment: HouseRulerAssessment
): HouseRulerInterpretationSection {
  const sourceHouse = houseMeanings[assessment.house];
  const targetHouse = assessment.rulerHouse ? houseMeanings[assessment.rulerHouse] : undefined;
  const planetMeaning = planetMeanings[assessment.ruler];
  const rulerName = formatPlanet(assessment.ruler);

  const title = `House ${assessment.house} Ruler — ${rulerName} in ${assessment.rulerSign}${
    targetHouse ? ` in ${targetHouse.title}` : ""
  }`;

  const targetText = targetHouse
    ? ` Because ${rulerName} is placed in ${targetHouse.title.toLowerCase()}, the topics of house ${assessment.house} tend to seek expression through ${targetHouse.lifeArea.toLowerCase()}.`
    : "";

  const body = [
    assessment.notes.join(" "),
    `House ${assessment.house} describes ${sourceHouse.lifeArea.toLowerCase()}. Its ruler, ${rulerName}, carries those topics into the rest of the chart.`,
    `${rulerName} represents ${lowerFirst(planetMeaning.coreMeaning)}`,
    targetText,
    `This creates a symbolic bridge between ${sourceHouse.title.toLowerCase()} and ${
      targetHouse ? targetHouse.title.toLowerCase() : "the ruler's placement"
    }, showing how one life domain feeds, challenges, or activates another.`,
    `The planetary condition is ${assessment.dignity.dignity}: ${assessment.dignity.notes.join(" ")}`,
  ]
    .filter(Boolean)
    .join(" ");

  return {
    title,
    body,
    keywords: unique([
      "house ruler",
      "rulership",
      "life domain",
      sourceHouse.title.toLowerCase(),
      ...(targetHouse ? [targetHouse.title.toLowerCase()] : []),
      ...planetMeaning.keywords.slice(0, 2),
    ]),
    weight: houseWeight(assessment.house),
    assessment,
  };
}

function houseWeight(house: number): number {
  const weights: Record<number, number> = {
    1: 4.8,
    4: 4.4,
    7: 4.4,
    8: 4.2,
    10: 4.6,
    12: 4.1,
  };

  return weights[house] ?? 3.0;
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
