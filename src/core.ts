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

export type HouseNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface PlanetPosition {
  longitude: number;
  sign: ZodiacSign;
  degree: number;
  house?: HouseNumber;
  retrograde?: boolean;
}

export interface HouseCusp {
  house: HouseNumber;
  longitude: number;
  sign: ZodiacSign;
  degree: number;
}

export interface NatalChart {
  planets: Record<Planet, PlanetPosition>;
  houses?: HouseCusp[];
  ascendant?: PlanetPosition;
  midheaven?: PlanetPosition;
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
  retrograde = false,
  house?: HouseNumber
): PlanetPosition {
  return {
    longitude: normalize(longitude),
    sign: getSign(longitude),
    degree: getDegree(longitude),
    house,
    retrograde,
  };
}

export function createHouseCuspsFromAscendant(ascendantLongitude: number): HouseCusp[] {
  const ascendantSignIndex = Math.floor(normalize(ascendantLongitude) / 30);

  return Array.from({ length: 12 }, (_, index) => {
    const signIndex = (ascendantSignIndex + index) % 12;
    const longitude = signIndex * 30;

    return {
      house: (index + 1) as HouseNumber,
      longitude,
      sign: getSign(longitude),
      degree: 0,
    };
  });
}

export function getWholeSignHouse(
  planetLongitude: number,
  ascendantLongitude: number
): HouseNumber {
  const planetSignIndex = Math.floor(normalize(planetLongitude) / 30);
  const ascendantSignIndex = Math.floor(normalize(ascendantLongitude) / 30);
  return (((planetSignIndex - ascendantSignIndex + 12) % 12) + 1) as HouseNumber;
}

export function createChart(
  data: Record<Planet, number>,
  options?: {
    ascendant?: number;
    midheaven?: number;
  }
): NatalChart {
  const houses =
    typeof options?.ascendant === "number"
      ? createHouseCuspsFromAscendant(options.ascendant)
      : undefined;

  const makePosition = (planet: Planet): PlanetPosition => {
    const longitude = data[planet];
    const house =
      typeof options?.ascendant === "number"
        ? getWholeSignHouse(longitude, options.ascendant)
        : undefined;

    return createPlanetPosition(longitude, false, house);
  };

  return {
    planets: {
      sun: makePosition("sun"),
      moon: makePosition("moon"),
      mercury: makePosition("mercury"),
      venus: makePosition("venus"),
      mars: makePosition("mars"),
      jupiter: makePosition("jupiter"),
      saturn: makePosition("saturn"),
      uranus: makePosition("uranus"),
      neptune: makePosition("neptune"),
      pluto: makePosition("pluto"),
    },
    houses,
    ascendant:
      typeof options?.ascendant === "number"
        ? createPlanetPosition(options.ascendant)
        : undefined,
    midheaven:
      typeof options?.midheaven === "number"
        ? createPlanetPosition(options.midheaven)
        : undefined,
  };
}
