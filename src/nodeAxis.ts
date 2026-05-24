import { createPlanetPosition, getWholeSignHouse } from "./core";
import type { PlanetPosition } from "./core";

export type LunarNode = "northNode" | "southNode";

export interface NodeAxis {
  northNode: PlanetPosition;
  southNode: PlanetPosition;
}

export function createNodeAxis(
  northNodeLongitude: number,
  ascendantLongitude?: number
): NodeAxis {
  const northHouse =
    typeof ascendantLongitude === "number"
      ? getWholeSignHouse(northNodeLongitude, ascendantLongitude)
      : undefined;
  const southNodeLongitude = northNodeLongitude + 180;
  const southHouse =
    typeof ascendantLongitude === "number"
      ? getWholeSignHouse(southNodeLongitude, ascendantLongitude)
      : undefined;

  return {
    northNode: createPlanetPosition(northNodeLongitude, false, northHouse),
    southNode: createPlanetPosition(southNodeLongitude, false, southHouse),
  };
}
