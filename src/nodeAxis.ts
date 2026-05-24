import type { HouseNumber, PlanetPosition, ZodiacSign } from "./core";

export type LunarNode = "northNode" | "southNode";

export interface NodeAxis {
  northNode: PlanetPosition;
  southNode: PlanetPosition;
}

const SIGNS: ZodiacSign[] = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

function normalize(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

function getSign(longitude: number): ZodiacSign {
  return SIGNS[Math.floor(normalize(longitude) / 30)];
}

function getDegree(longitude: number): number {
  return normalize(longitude) % 30;
}

function getWholeSignHouse(
  planetLongitude: number,
  ascendantLongitude: number
): HouseNumber {
  const planetSignIndex = Math.floor(normalize(planetLongitude) / 30);
  const ascendantSignIndex = Math.floor(normalize(ascendantLongitude) / 30);
  return (((planetSignIndex - ascendantSignIndex + 12) % 12) + 1) as HouseNumber;
}

function createNodePosition(
  longitude: number,
  house?: HouseNumber
): PlanetPosition {
  return {
    longitude: normalize(longitude),
    sign: getSign(longitude),
    degree: getDegree(longitude),
    house,
    retrograde: false,
  };
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
    northNode: createNodePosition(northNodeLongitude, northHouse),
    southNode: createNodePosition(southNodeLongitude, southHouse),
  };
}
