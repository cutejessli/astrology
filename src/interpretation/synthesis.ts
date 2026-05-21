// ============================================================
// Natal Chart Synthesis and Interpretation
// ============================================================

import { NatalChart, Planet, ZodiacSign } from "../core";
import { planetMeanings } from "./planets";
import { signMeanings } from "./signs";

export interface InterpretationSection {
  title: string;
  body: string;
  keywords: string[];
}

export interface NatalChartInterpretation {
  summary: string;
  sections: InterpretationSection[];
}

/**
 * Synthesize a natal chart into meaningful astrological interpretation.
 * Focuses on key personal planets: Sun, Moon, Mercury, Venus, Mars.
 */
export function interpretNatalChart(chart: NatalChart): NatalChartInterpretation {
  const sections: InterpretationSection[] = [];

  // Sun sign interpretation
  const sunSign = chart.planets.sun.sign;
  const sunSection = interpretPlanetInSign("sun", sunSign);
  sections.push(sunSection);

  // Moon sign interpretation
  const moonSign = chart.planets.moon.sign;
  const moonSection = interpretPlanetInSign("moon", moonSign);
  sections.push(moonSection);

  // Mercury sign interpretation
  const mercurySign = chart.planets.mercury.sign;
  const mercurySection = interpretPlanetInSign("mercury", mercurySign);
  sections.push(mercurySection);

  // Venus sign interpretation
  const venusSign = chart.planets.venus.sign;
  const venusSection = interpretPlanetInSign("venus", venusSign);
  sections.push(venusSection);

  // Mars sign interpretation
  const marsSign = chart.planets.mars.sign;
  const marsSection = interpretPlanetInSign("mars", marsSign);
  sections.push(marsSection);

  // Create summary
  const summary = createChartSummary(sunSign, moonSign, mercurySign, venusSign, marsSign);

  return {
    summary,
    sections,
  };
}

/**
 * Create an interpretation for a planet in a specific sign.
 */
function interpretPlanetInSign(planet: Planet, sign: ZodiacSign): InterpretationSection {
  const planetMeaning = planetMeanings[planet];
  const signMeaning = signMeanings[sign];

  // Create meaningful synthesis of planet + sign
  const planetLabel = capitalizeFirst(planet);
  const title = `${planetLabel} in ${sign}`;

  // Blend planet and sign meanings
  const body = synthesizePlanetInSign(planetMeaning, signMeaning, planet, sign);

  // Combine keywords from both
  const keywords = [
    ...planetMeaning.keywords.slice(0, 2),
    ...signMeaning.keywords.slice(0, 2),
  ];

  return { title, body, keywords };
}

/**
 * Synthesize planet meaning with sign coloring.
 */
function synthesizePlanetInSign(
  planetMeaning: any,
  signMeaning: any,
  planet: Planet,
  sign: ZodiacSign
): string {
  const sections: string[] = [];

  // Opening line that blends planet and sign archetypal natures
  const opening = createOpeningBlend(planet, sign, planetMeaning, signMeaning);
  sections.push(opening);

  // How this planet expresses through this sign
  const expressionLine = `Your ${capitalizeFirst(planet)} in ${sign} carries the energy of the ${signMeaning.element} element and the ${signMeaning.modality} modality, expressing itself as a ${signMeaning.coreArchetype.toLowerCase()}.`;
  sections.push(expressionLine);

  // Gifts when expressed well
  const giftLine = `When expressed consciously, this placement offers ${createListPhrase(
    signMeaning.gifts.slice(0, 2)
  )} in service of ${capitalizeFirst(planet)}'s essential function of ${planetMeaning.psychologicalFunction.toLowerCase()}.`;
  sections.push(giftLine);

  // The shadow potential
  const shadowLine = `The shadow edge appears when ${planetMeaning.shadowExpression.toLowerCase()} meets ${sign}'s tendencies toward ${createListPhrase(
    signMeaning.challenges.slice(0, 2)
  ).toLowerCase()}.`;
  sections.push(shadowLine);

  // Integration wisdom
  const integrationLine = `Your growth path is to ${signMeaning.growthPath.toLowerCase()} while letting your ${capitalizeFirst(
    planet
  )} ${planetMeaning.healingPath.toLowerCase()}.`;
  sections.push(integrationLine);

  return sections.join(" ");
}

/**
 * Create an opening blend that weaves planet and sign together.
 */
function createOpeningBlend(
  planet: Planet,
  sign: ZodiacSign,
  planetMeaning: any,
  signMeaning: any
): string {
  const openings = [
    `Your ${capitalizeFirst(planet)} in ${sign} expresses ${planetMeaning.coreMeaning.toLowerCase()} through the lens of ${signMeaning.coreArchetype.toLowerCase()}.`,
    `In ${sign}, your ${capitalizeFirst(planet)} seeks to ${extractVerb(
      planetMeaning.coreMeaning
    )} as ${signMeaning.coreArchetype.toLowerCase()}.`,
    `The ${sign} influence shapes your ${capitalizeFirst(planet)} into a ${signMeaning.coreArchetype.toLowerCase()} energy, informed by ${planetMeaning.psychologicalFunction.toLowerCase()}.`,
  ];

  // Use modular selection based on planet/sign to vary openings
  const hash = (planet.charCodeAt(0) + sign.charCodeAt(0)) % openings.length;
  return openings[hash];
}

/**
 * Create a summary paragraph that addresses all five core planets.
 */
function createChartSummary(
  sunSign: ZodiacSign,
  moonSign: ZodiacSign,
  mercurySign: ZodiacSign,
  venusSign: ZodiacSign,
  marsSign: ZodiacSign
): string {
  const sections: string[] = [];

  sections.push(
    `Your natal chart reveals a unique constellation of inner energies that shape how you experience yourself and the world.`
  );

  const sunSignMeaning = signMeanings[sunSign];
  const moonSignMeaning = signMeanings[moonSign];

  sections.push(
    `Your Sun in ${sunSign} invites you toward ${extractCorething(
      sunSignMeaning
    )}, while your Moon in ${moonSign} responds with a need for ${extractCorething(moonSignMeaning)}.`
  );

  const mercurySignMeaning = signMeanings[mercurySign];
  const venusSignMeaning = signMeanings[venusSign];
  const marsSignMeaning = signMeanings[marsSign];

  sections.push(
    `How you think, connect, and communicate is filtered through ${mercurySignMeaning.coreArchetype.toLowerCase()}, how you love through ${venusSignMeaning.coreArchetype.toLowerCase()}, and how you act through ${marsSignMeaning.coreArchetype.toLowerCase()}.`
  );

  sections.push(
    `These planetary positions are not fixed traits but potentials—invitations to become more fully yourself through conscious awareness and intentional action.`
  );

  return sections.join(" ");
}

/**
 * Helper: Extract a key phrase from sign meaning for summary
 */
function extractCorething(signMeaning: any): string {
  const coreElements = signMeaning.coreArchetype.split("—")[1] || signMeaning.gifts[0];
  return coreElements.toLowerCase();
}

/**
 * Helper: Extract a verb from planet meaning
 */
function extractVerb(meaning: string): string {
  // Find the first verb in the meaning
  const verbs = ["seek", "shine", "govern", "reveal", "connect", "attract", "cut"];
  for (const verb of verbs) {
    if (meaning.toLowerCase().includes(verb)) {
      return verb;
    }
  }
  return "express";
}

/**
 * Helper: Create a natural list phrase
 */
function createListPhrase(items: string[]): string {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return items.slice(0, -1).join(", ") + `, and ${items[items.length - 1]}`;
}

/**
 * Helper: Capitalize first letter
 */
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
