import { HouseNumber, PlanetPosition } from "../core";
import { lilithMeaning } from "../specialPoints/lilith";
import { signMeanings } from "./signs";
import { houseMeanings } from "./houses";

export interface LilithInterpretationSection {
  title: string;
  body: string;
  keywords: string[];
  weight: number;
  position: PlanetPosition;
}

export function interpretLilith(position: PlanetPosition): LilithInterpretationSection {
  const signMeaning = signMeanings[position.sign];
  const houseMeaning = position.house ? houseMeanings[position.house as HouseNumber] : undefined;

  const title = `Black Moon Lilith in ${position.sign}${houseMeaning ? ` in ${houseMeaning.title}` : ""}`;

  const houseText = houseMeaning
    ? ` In ${houseMeaning.title.toLowerCase()}, this reclamation path expresses through ${houseMeaning.lifeArea.toLowerCase()}.`
    : "";

  const body = [
    `Black Moon Lilith describes the exiled instinct and the part of the psyche that refuses to be domesticated, silenced, or made palatable.`,
    `In ${position.sign}, Lilith moves through ${lowerFirst(signMeaning.coreArchetype)}.`,
    `This can bring shadow and reclamation themes around ${lowerFirst(signMeaning.psychologicalExpression)}.`,
    houseText,
    `The healing path is this: ${lilithMeaning.healingPath}`,
  ].filter(Boolean).join(" ");

  return {
    title,
    body,
    keywords: unique([
      "lilith",
      "black moon lilith",
      ...lilithMeaning.keywords,
      ...signMeaning.keywords.slice(0, 3),
      ...(houseMeaning ? houseMeaning.keywords.slice(0, 2) : []),
    ]),
    weight: 4.4,
    position,
  };
}

function lowerFirst(value: string): string {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values));
}
