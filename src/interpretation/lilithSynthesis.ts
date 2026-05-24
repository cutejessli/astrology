import { HouseNumber, PlanetPosition } from "../core";
import { lilithMeaning } from "../specialPoints/lilith";
import { signMeanings } from "./signs";
import { houseMeanings } from "./houses";
import { joinSentences, lowerFirst } from "./voice";

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

  const body = joinSentences([
    `Black Moon Lilith points to the part of you that will not abandon itself just to be accepted`,
    `In ${position.sign}, that raw instinct moves through ${lowerFirst(signMeaning.coreArchetype)}`,
    `This can bring up shadow, shame, desire, anger, or refusal around ${lowerFirst(signMeaning.psychologicalExpression)}, but underneath it is a call back to your own authority`,
    houseMeaning
      ? `Because this falls in ${houseMeaning.title.toLowerCase()}, the reclamation work tends to happen through ${lowerFirst(houseMeaning.lifeArea)}`
      : undefined,
    `The medicine is to let sovereignty become embodied truth, not endless opposition`,
    houseMeaning
      ? `A grounded way to work with it is to ${lowerFirst(houseMeaning.healingPath)}`
      : undefined,
  ]);

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

function unique(values: string[]): string[] {
  return Array.from(new Set(values));
}
