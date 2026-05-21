// ============================================================
// Astrology Core v1
// Proprietary Astrology Engine
// ============================================================

export type ZodiacSign =
  | "Aries"
  | "Taurus"
  | "Gemini"
  | "Cancer"
  | "Leo"
  | "Virgo"
  | "Libra"
  | "Scorpio"
  | "Sagittarius"
  | "Capricorn"
  | "Aquarius"
  | "Pisces";

export const SIGNS: ZodiacSign[] = [
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

export type Planet =
  | "sun"
  | "moon"
  | "mercury"
  | "venus"
  | "mars"
  | "jupiter"
  | "saturn"
  | "uranus"
  | "neptune"
  | "pluto";

export interface PlanetPosition {
  longitude: number;
  sign: ZodiacSign;
  degree: number;
  retrograde?: boolean;
}

export interface NatalChart {
  planets: Record<Planet, PlanetPosition>;
}

export function normalize(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

export function getSign(longitude: number): ZodiacSign {
  return SIGNS[Math.floor(normalize(longitude) / 30)];
}

export function getDegree(longitude: number): number {
  return normalize(longitude) % 30;
}

export function createPlanetPosition(
  longitude: number,
  retrograde = false
): PlanetPosition {
  return {
    longitude,
    sign: getSign(longitude),
    degree: getDegree(longitude),
    retrograde,
  };
}

export function createChart(
  data: Record<Planet, number>
): NatalChart {
  return {
    planets: {
      sun: createPlanetPosition(data.sun),
      moon: createPlanetPosition(data.moon),
      mercury: createPlanetPosition(data.mercury),
      venus: createPlanetPosition(data.venus),
      mars: createPlanetPosition(data.mars),
      jupiter: createPlanetPosition(data.jupiter),
      saturn: createPlanetPosition(data.saturn),
      uranus: createPlanetPosition(data.uranus),
      neptune: createPlanetPosition(data.neptune),
      pluto: createPlanetPosition(data.pluto),
    },
  };
}