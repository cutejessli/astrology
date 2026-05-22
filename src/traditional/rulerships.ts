import { Planet, ZodiacSign } from "../core";

export type EssentialDignity =
  | "domicile"
  | "exaltation"
  | "detriment"
  | "fall"
  | "peregrine";

export interface SignRulership {
  sign: ZodiacSign;
  traditionalRuler: Planet;
  modernRuler?: Planet;
  exaltedPlanet?: Planet;
  detrimentPlanets: Planet[];
  fallPlanet?: Planet;
}

export interface PlanetDignityAssessment {
  planet: Planet;
  sign: ZodiacSign;
  dignity: EssentialDignity;
  ruler: Planet;
  modernRuler?: Planet;
  notes: string[];
}

export const signRulerships: Record<ZodiacSign, SignRulership> = {
  Aries: {
    sign: "Aries",
    traditionalRuler: "mars",
    exaltedPlanet: "sun",
    detrimentPlanets: ["venus"],
    fallPlanet: "saturn",
  },
  Taurus: {
    sign: "Taurus",
    traditionalRuler: "venus",
    exaltedPlanet: "moon",
    detrimentPlanets: ["mars"],
  },
  Gemini: {
    sign: "Gemini",
    traditionalRuler: "mercury",
    detrimentPlanets: ["jupiter"],
  },
  Cancer: {
    sign: "Cancer",
    traditionalRuler: "moon",
    exaltedPlanet: "jupiter",
    detrimentPlanets: ["saturn"],
    fallPlanet: "mars",
  },
  Leo: {
    sign: "Leo",
    traditionalRuler: "sun",
    detrimentPlanets: ["saturn"],
  },
  Virgo: {
    sign: "Virgo",
    traditionalRuler: "mercury",
    exaltedPlanet: "mercury",
    detrimentPlanets: ["jupiter"],
    fallPlanet: "venus",
  },
  Libra: {
    sign: "Libra",
    traditionalRuler: "venus",
    exaltedPlanet: "saturn",
    detrimentPlanets: ["mars"],
    fallPlanet: "sun",
  },
  Scorpio: {
    sign: "Scorpio",
    traditionalRuler: "mars",
    modernRuler: "pluto",
    detrimentPlanets: ["venus"],
    fallPlanet: "moon",
  },
  Sagittarius: {
    sign: "Sagittarius",
    traditionalRuler: "jupiter",
    detrimentPlanets: ["mercury"],
  },
  Capricorn: {
    sign: "Capricorn",
    traditionalRuler: "saturn",
    exaltedPlanet: "mars",
    detrimentPlanets: ["moon"],
    fallPlanet: "jupiter",
  },
  Aquarius: {
    sign: "Aquarius",
    traditionalRuler: "saturn",
    modernRuler: "uranus",
    detrimentPlanets: ["sun"],
  },
  Pisces: {
    sign: "Pisces",
    traditionalRuler: "jupiter",
    modernRuler: "neptune",
    exaltedPlanet: "venus",
    detrimentPlanets: ["mercury"],
    fallPlanet: "mercury",
  },
};

export function getSignRuler(sign: ZodiacSign, useModern = true): Planet {
  const rulership = signRulerships[sign];
  return useModern && rulership.modernRuler ? rulership.modernRuler : rulership.traditionalRuler;
}

export function assessPlanetDignity(
  planet: Planet,
  sign: ZodiacSign,
  useModernRuler = true
): PlanetDignityAssessment {
  const rulership = signRulerships[sign];
  const notes: string[] = [];
  let dignity: EssentialDignity = "peregrine";

  if (planet === rulership.traditionalRuler || planet === rulership.modernRuler) {
    dignity = "domicile";
    notes.push(`${formatPlanet(planet)} is in its own sign, giving it direct access to its natural expression.`);
  }

  if (planet === rulership.exaltedPlanet) {
    dignity = "exaltation";
    notes.push(`${formatPlanet(planet)} is exalted in ${sign}, suggesting refined, elevated, or highly visible expression.`);
  }

  if (rulership.detrimentPlanets.includes(planet)) {
    dignity = "detriment";
    notes.push(`${formatPlanet(planet)} is in detriment in ${sign}, asking for conscious integration and maturity.`);
  }

  if (planet === rulership.fallPlanet) {
    dignity = "fall";
    notes.push(`${formatPlanet(planet)} is in fall in ${sign}, often expressing through humility, healing, and deep inner work.`);
  }

  if (notes.length === 0) {
    notes.push(`${formatPlanet(planet)} has no major essential dignity or debility in ${sign}.`);
  }

  return {
    planet,
    sign,
    dignity,
    ruler: getSignRuler(sign, useModernRuler),
    modernRuler: rulership.modernRuler,
    notes,
  };
}

function formatPlanet(planet: Planet): string {
  return planet.charAt(0).toUpperCase() + planet.slice(1);
}
