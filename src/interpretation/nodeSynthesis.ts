import { HouseNumber, NodeAxis } from "../core";
import { getNodeAxisTheme, nodeMeanings } from "../specialPoints/nodes";
import { signMeanings } from "./signs";
import { houseMeanings } from "./houses";
import { joinSentences, lowerFirst } from "./voice";

export interface NodeAxisInterpretationSection {
  title: string;
  body: string;
  keywords: string[];
  weight: number;
  axis: NodeAxis;
}

export function interpretNodeAxis(axis: NodeAxis): NodeAxisInterpretationSection {
  const north = axis.northNode;
  const south = axis.southNode;
  const northMeaning = nodeMeanings.northNode;
  const southMeaning = nodeMeanings.southNode;
  const northSign = signMeanings[north.sign];
  const southSign = signMeanings[south.sign];
  const northHouse = north.house ? houseMeanings[north.house as HouseNumber] : undefined;
  const southHouse = south.house ? houseMeanings[south.house as HouseNumber] : undefined;

  const title = `Nodal Axis — North Node in ${north.sign}, South Node in ${south.sign}`;

  const body = joinSentences([
    `The lunar nodes describe a growth current: familiar patterns behind you, and a new direction asking for practice`,
    `The South Node in ${south.sign} shows old gifts, reflexes, and comfort zones connected to ${lowerFirst(southMeaning.coreMeaning)}`,
    `The North Node in ${north.sign} points toward ${lowerFirst(northMeaning.coreMeaning)}, even when that direction feels unfamiliar at first`,
    `This axis moves ${getNodeAxisTheme(north.sign)}`,
    `The ${south.sign} side carries the imprint of ${lowerFirst(southSign.coreArchetype)}, while the ${north.sign} side asks you to practice ${lowerFirst(northSign.coreArchetype)} with more trust`,
    northHouse && southHouse
      ? `In daily life, the North Node develops through ${lowerFirst(northHouse.lifeArea)}, while the South Node asks you to loosen over-identification with ${lowerFirst(southHouse.lifeArea)}`
      : undefined,
    `The medicine is not to reject the South Node, but to stop living there on autopilot; its gifts can support the North Node path`,
  ]);

  return {
    title,
    body,
    keywords: unique([
      "nodes",
      "north node",
      "south node",
      "karma",
      "evolution",
      ...northMeaning.keywords.slice(0, 3),
      ...southMeaning.keywords.slice(0, 3),
      ...northSign.keywords.slice(0, 2),
      ...southSign.keywords.slice(0, 2),
    ]),
    weight: 5.0,
    axis,
  };
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values));
}
