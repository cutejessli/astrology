import { HouseNumber } from "../core";
import {
  NodeAxis,
  getNodeAxisTheme,
  nodeMeanings,
} from "../specialPoints/nodes";
import { signMeanings } from "./signs";
import { houseMeanings } from "./houses";

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

  const houseText = northHouse && southHouse
    ? ` The house axis adds lived context: the North Node develops through ${northHouse.lifeArea.toLowerCase()}, while the South Node releases over-identification with ${southHouse.lifeArea.toLowerCase()}.`
    : "";

  const body = [
    `The lunar nodes describe an evolutionary axis rather than a personality trait.`,
    `The South Node in ${south.sign} shows familiar gifts and inherited patterns connected to ${lowerFirst(southMeaning.coreMeaning)}`,
    `The North Node in ${north.sign} points toward ${lowerFirst(northMeaning.coreMeaning)}`,
    `This axis moves ${getNodeAxisTheme(north.sign)}.`,
    `The ${south.sign} side carries the archetype of ${lowerFirst(southSign.coreArchetype)}, while the ${north.sign} side asks the soul to grow through ${lowerFirst(northSign.coreArchetype)}.`,
    houseText,
    `The healing path is not to reject the South Node, but to use its gifts consciously while letting the North Node become the new horizon of embodiment.`,
  ].filter(Boolean).join(" ");

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

function lowerFirst(value: string): string {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values));
}
