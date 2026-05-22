// ============================================================
// Aspect Interpretation Engine
// ============================================================

import { Aspect, AspectType } from "../aspects";
import { Planet } from "../core";
import { planetMeanings, PlanetMeaning } from "./planets";
import { aspectMeanings, AspectMeaning } from "./aspectMeanings";

export interface AspectInterpretationSection {
  title: string;
  body: string;
  keywords: string[];
  orb: number;
  weight: number;
}

/**
 * Interpret a single aspect into a readable section.
 */
export function interpretAspect(aspect: Aspect): AspectInterpretationSection {
  const planetAMeaning = planetMeanings[aspect.pointA];
  const planetBMeaning = planetMeanings[aspect.pointB];
  const aspectMeaning = aspectMeanings[aspect.type];

  const title = createAspectTitle(aspect, planetAMeaning, planetBMeaning, aspectMeaning);
  const body = synthesizeAspectBody(
    aspect,
    planetAMeaning,
    planetBMeaning,
    aspectMeaning
  );
  const keywords = combineAspectKeywords(
    aspect,
    planetAMeaning,
    planetBMeaning,
    aspectMeaning
  );
  const weight = calculateAspectWeight(aspect);

  return {
    title,
    body,
    keywords,
    orb: aspect.orb,
    weight,
  };
}

/**
 * Interpret multiple aspects, sorted by weight.
 */
export function interpretAspects(aspects: Aspect[]): AspectInterpretationSection[] {
  const sections = aspects.map((aspect) => interpretAspect(aspect));
  return sections.sort((a, b) => b.weight - a.weight);
}

/**
 * Create a meaningful title that captures the aspect dynamic.
 */
function createAspectTitle(
  aspect: Aspect,
  planetAMeaning: PlanetMeaning,
  planetBMeaning: PlanetMeaning,
  aspectMeaning: AspectMeaning
): string {
  const planetAName = capitalizeFirst(aspect.pointA);
  const planetBName = capitalizeFirst(aspect.pointB);
  const aspectName = capitalizeFirst(aspect.type);

  // Extract key concepts from planet meanings
  const conceptA = extractKeywordFromMeaning(planetAMeaning.coreMeaning);
  const conceptB = extractKeywordFromMeaning(planetBMeaning.coreMeaning);

  // Create a dynamic title that captures both planets and aspect quality
  const dynamicConcept = createDynamicConcept(aspect.type, conceptA, conceptB);

  return `${planetAName} ${aspectName} ${planetBName} — ${dynamicConcept}`;
}

/**
 * Extract a key concept from meaning text.
 */
function extractKeywordFromMeaning(meaning: string): string {
  const keywords = [
    "identity",
    "emotion",
    "communication",
    "love",
    "action",
    "consciousness",
    "will",
    "expression",
    "growth",
    "responsibility",
    "power",
    "transformation",
  ];

  for (const keyword of keywords) {
    if (meaning.toLowerCase().includes(keyword)) {
      return capitalizeFirst(keyword);
    }
  }

  const words = meaning.split(" ");
  return capitalizeFirst(words[0]);
}

/**
 * Create a dynamic concept phrase based on aspect type.
 */
function createDynamicConcept(aspectType: AspectType, conceptA: string, conceptB: string): string {
  const conjunction = `${conceptA} and ${conceptB} Fused`;
  const opposition = `${conceptA} Meets ${conceptB}`;
  const trine = `${conceptA}, ${conceptB}, and Sacred Flow`;
  const square = `${conceptA}, ${conceptB}, and Growth Pressure`;
  const sextile = `${conceptA} Supports ${conceptB}`;

  const concepts: Record<AspectType, string> = {
    conjunction,
    opposition,
    trine,
    square,
    sextile,
  };

  return concepts[aspectType];
}

/**
 * Synthesize aspect body text from all dimensions.
 */
function synthesizeAspectBody(
  aspect: Aspect,
  planetAMeaning: PlanetMeaning,
  planetBMeaning: PlanetMeaning,
  aspectMeaning: AspectMeaning
): string {
  const sections: string[] = [];

  // Opening: establish what the two planets represent
  const opening = synthesizeOpening(aspect, planetAMeaning, planetBMeaning, aspectMeaning);
  sections.push(opening);

  // Dynamic: what the aspect creates
  const dynamic = synthesizeDynamic(aspect, planetAMeaning, planetBMeaning, aspectMeaning);
  sections.push(dynamic);

  // Gift: the potential
  const gift = synthesizeGift(aspect, planetAMeaning, planetBMeaning, aspectMeaning);
  sections.push(gift);

  // Challenge: the shadow
  const challenge = synthesizeChallenge(aspect, planetAMeaning, planetBMeaning, aspectMeaning);
  sections.push(challenge);

  // Integration: the path forward
  const integration = synthesizeIntegration(aspect, planetAMeaning, planetBMeaning, aspectMeaning);
  sections.push(integration);

  return sections.join(" ");
}

/**
 * Synthesize opening that establishes both planets and aspect.
 */
function synthesizeOpening(
  aspect: Aspect,
  planetAMeaning: PlanetMeaning,
  planetBMeaning: PlanetMeaning,
  aspectMeaning: AspectMeaning
): string {
  const planetAName = capitalizeFirst(aspect.pointA);
  const planetBName = capitalizeFirst(aspect.pointB);
  const aspectName = aspect.type;

  // Brief context about what each planet means
  const aPurpose = extractCorePurpose(planetAMeaning.psychologicalFunction);
  const bPurpose = extractCorePurpose(planetBMeaning.psychologicalFunction);

  const openings = [
    `Your ${planetAName} (${aPurpose}) and ${planetBName} (${bPurpose}) meet in a ${aspectName}, creating ${extractCorePurpose(
      aspectMeaning.dynamic
    )}.`,
    `In ${aspectName}, your ${planetAName} and ${planetBName} form a dynamic where ${extractCorePurpose(
      aspectMeaning.dynamic
    )}.`,
  ];

  const index = (aspect.pointA.charCodeAt(0) + aspect.pointB.charCodeAt(0)) % openings.length;
  return openings[index];
}

/**
 * Extract core purpose from a longer phrase.
 */
function extractCorePurpose(text: string): string {
  // Return a brief fragment
  const parts = text.split(",")[0].trim().toLowerCase();
  return parts;
}

/**
 * Synthesize the dynamic of the aspect.
 */
function synthesizeDynamic(
  aspect: Aspect,
  planetAMeaning: PlanetMeaning,
  planetBMeaning: PlanetMeaning,
  aspectMeaning: AspectMeaning
): string {
  const planetAName = capitalizeFirst(aspect.pointA);
  const planetBName = capitalizeFirst(aspect.pointB);

  // Reference the aspect's dynamic quality
  const dynamicCore = aspectMeaning.dynamic.split(".")[0].toLowerCase();

  return `This ${aspect.type} creates a dynamic where ${dynamicCore}, bringing together your ${planetAName}'s drive for ${extractCorePurpose(
    planetAMeaning.coreMeaning
  )} and your ${planetBName}'s need for ${extractCorePurpose(planetBMeaning.coreMeaning)}.`;
}

/**
 * Synthesize the gift of the aspect.
 */
function synthesizeGift(
  aspect: Aspect,
  planetAMeaning: PlanetMeaning,
  planetBMeaning: PlanetMeaning,
  aspectMeaning: AspectMeaning
): string {
  const planetAName = capitalizeFirst(aspect.pointA);
  const planetBName = capitalizeFirst(aspect.pointB);

  // Reference the aspect's gift
  const giftCore = aspectMeaning.gift.split(".")[0].toLowerCase();

  return `When you work with this ${aspect.type} consciously, ${giftCore}, with ${planetAName} and ${planetBName} complementing each other's strength.`;
}

/**
 * Synthesize the challenge of the aspect.
 */
function synthesizeChallenge(
  aspect: Aspect,
  planetAMeaning: PlanetMeaning,
  planetBMeaning: PlanetMeaning,
  aspectMeaning: AspectMeaning
): string {
  const planetAName = capitalizeFirst(aspect.pointA);
  const planetBName = capitalizeFirst(aspect.pointB);

  // Reference the aspect's challenge
  const challengeCore = aspectMeaning.challenge.split(".")[0].toLowerCase();

  return `The shadow edge appears when ${challengeCore}, or when ${planetAName}'s and ${planetBName}'s needs conflict rather than cooperate.`;
}

/**
 * Synthesize the integration path.
 */
function synthesizeIntegration(
  aspect: Aspect,
  planetAMeaning: PlanetMeaning,
  planetBMeaning: PlanetMeaning,
  aspectMeaning: AspectMeaning
): string {
  const planetAName = capitalizeFirst(aspect.pointA);
  const planetBName = capitalizeFirst(aspect.pointB);

  // Reference the aspect's integration path
  const integrationCore = aspectMeaning.integrationPath.split(".")[0].toLowerCase();

  return `Your growth path is to ${integrationCore}, allowing ${planetAName} and ${planetBName} to mature into conscious partnership.`;
}

/**
 * Combine keywords from all dimensions.
 */
function combineAspectKeywords(
  aspect: Aspect,
  planetAMeaning: PlanetMeaning,
  planetBMeaning: PlanetMeaning,
  aspectMeaning: AspectMeaning
): string[] {
  const combined = [
    ...planetAMeaning.keywords.slice(0, 2),
    ...planetBMeaning.keywords.slice(0, 2),
    ...aspectMeaning.keywords.slice(0, 2),
  ];

  // Remove duplicates while preserving order
  return Array.from(new Set(combined));
}

/**
 * Calculate weight based on:
 * - Tighter orb = higher weight
 * - Aspect type significance
 */
function calculateAspectWeight(aspect: Aspect): number {
  // Base weight by aspect type (conjunction/opposition/square most significant)
  const typeWeights: Record<AspectType, number> = {
    conjunction: 3.0,
    opposition: 2.8,
    square: 2.6,
    trine: 2.2,
    sextile: 1.8,
  };

  const baseWeight = typeWeights[aspect.type];

  // Bonus for tighter orb (max orb is 8 degrees, minimum is effectively 0)
  const orbBonus = Math.max(0, (8 - aspect.orb) / 8) * 2;

  return baseWeight + orbBonus;
}

/**
 * Helper: Capitalize first letter of string
 */
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
