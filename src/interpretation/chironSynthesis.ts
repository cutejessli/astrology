import { HouseNumber, PlanetPosition } from "../core";
import { chironMeaning } from "../specialPoints/chiron";
import { signMeanings } from "./signs";
import { houseMeanings } from "./houses";

export interface ChironInterpretationSection {
  title: string;
  body: string;
  keywords: string[];
  weight: number;
  position: PlanetPosition;
}

export function interpretChiron(position: PlanetPosition): ChironInterpretationSection {
  const signMeaning = signMeanings[position.sign];
  const houseMeaning = position.house ? houseMeanings[position.house as HouseNumber] : undefined;

  const title = `Chiron in ${position.sign}${houseMeaning ? ` in ${houseMeaning.title}` : ""}`;

  const houseText = houseMeaning
    ? ` In ${houseMeaning.title.toLowerCase()}, this healing path expresses through ${houseMeaning.lifeArea.toLowerCase()}.`
    : "";

  const body = [
    `Chiron describes the sacred wound and the medicine that can emerge from it.`,
    `In ${position.sign}, the wound-and-gift pattern is filtered through ${lowerFirst(signMeaning.coreArchetype)}.`,
    `This may involve healing themes around ${lowerFirst(signMeaning.psychologicalExpression)}.`,
    houseText,
    `The deeper medicine is this: ${chironMeaning.healingPath}`,
  ].filter(Boolean).join(" ");

  return {
    title,
    body,
    keywords: unique([
      "chiron",
      ...chironMeaning.keywords,
      ...signMeaning.keywords.slice(0, 3),
      ...(houseMeaning ? houseMeaning.keywords.slice(0, 2) : []),
    ]),
    weight: 4.6,
    position,
  };
}

function lowerFirst(value: string): string {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values));
}
