import { HouseNumber, PlanetPosition } from "../core";
import { chironMeaning } from "../specialPoints/chiron";
import { signMeanings } from "./signs";
import { houseMeanings } from "./houses";
import { joinSentences, lowerFirst } from "./voice";

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

  const body = joinSentences([
    `Chiron speaks to the tender place where a wound can slowly become medicine`,
    `In ${position.sign}, that healing story moves through ${lowerFirst(signMeaning.coreArchetype)}`,
    `You may notice old sensitivity around ${lowerFirst(signMeaning.psychologicalExpression)}, but this is also where wisdom begins to ripen through lived experience`,
    houseMeaning
      ? `Because this falls in ${houseMeaning.title.toLowerCase()}, the healing path tends to unfold through ${lowerFirst(houseMeaning.lifeArea)}`
      : undefined,
    `The deeper medicine is to ${lowerFirst(chironMeaning.healingPath)}`,
    houseMeaning
      ? `A grounded way to work with it is to ${lowerFirst(houseMeaning.healingPath)}`
      : undefined,
  ]);

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

function unique(values: string[]): string[] {
  return Array.from(new Set(values));
}
