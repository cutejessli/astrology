// ============================================================
// Aspect Interpretation Engine
// ============================================================

import { Aspect, AspectType } from "../aspects";
import { planetMeanings } from "./planets";
import { aspectMeanings } from "./aspectMeanings";

export interface AspectInterpretationSection {
  title: string;
  body: string;
  keywords: string[];
  orb: number;
  weight: number;
}

export function interpretAspect(aspect: Aspect): AspectInterpretationSection {
  const planetA = planetMeanings[aspect.pointA];
  const planetB = planetMeanings[aspect.pointB];
  const aspectMeaning = aspectMeanings[aspect.type];

  const planetAName = formatPlanetName(aspect.pointA);
  const planetBName = formatPlanetName(aspect.pointB);
  const aspectName = formatAspectName(aspect.type);

  const title = `${planetAName} ${aspectName} ${planetBName} — ${createAspectTitlePhrase(
    aspect.type,
    planetA.keywords[0],
    planetB.keywords[0]
  )}`;

  const body = [
    `${planetAName} represents ${lowerFirst(planetA.coreMeaning)}`,
    `${planetBName} represents ${lowerFirst(planetB.coreMeaning)}`,
    `Together, this ${aspect.type} creates ${lowerFirst(aspectMeaning.dynamic)}`,
    `The gift of this aspect is ${lowerFirst(aspectMeaning.gift)}`,
    `The challenge is ${lowerFirst(aspectMeaning.challenge)}`,
    `The integration path is to ${lowerFirst(aspectMeaning.integrationPath)}`,
    `With an orb of ${aspect.orb.toFixed(2)}°, this aspect carries ${describeOrbStrength(
      aspect.orb
    )} emphasis in the chart.`,
  ].join(" ");

  const keywords = unique([
    ...planetA.keywords.slice(0, 3),
    ...planetB.keywords.slice(0, 3),
    ...aspectMeaning.keywords.slice(0, 3),
  ]);

  return {
    title,
    body,
    keywords,
    orb: aspect.orb,
    weight: calculateAspectWeight(aspect),
  };
}

export function interpretAspects(aspects: Aspect[]): AspectInterpretationSection[] {
  return aspects.map(interpretAspect).sort((a, b) => b.weight - a.weight);
}

function calculateAspectWeight(aspect: Aspect): number {
  const typeWeights: Record<AspectType, number> = {
    conjunction: 3.0,
    opposition: 2.8,
    square: 2.6,
    trine: 2.2,
    sextile: 1.8,
  };

  const baseWeight = typeWeights[aspect.type];
  const orbBonus = Math.max(0, (8 - aspect.orb) / 8) * 2;

  return Number((baseWeight + orbBonus).toFixed(2));
}

function createAspectTitlePhrase(
  aspectType: AspectType,
  planetAKeyword: string,
  planetBKeyword: string
): string {
  const a = capitalize(planetAKeyword);
  const b = capitalize(planetBKeyword);

  const phrases: Record<AspectType, string> = {
    conjunction: `${a} and ${b} Fused`,
    opposition: `${a} and ${b} in Sacred Polarity`,
    trine: `${a}, ${b}, and Natural Flow`,
    square: `${a}, ${b}, and Growth Pressure`,
    sextile: `${a} Supporting ${b}`,
  };

  return phrases[aspectType];
}

function describeOrbStrength(orb: number): string {
  if (orb <= 1) return "very strong and immediate";
  if (orb <= 3) return "strong and noticeable";
  if (orb <= 5) return "moderate but meaningful";
  return "subtle but still relevant";
}

function formatPlanetName(planet: string): string {
  if (planet === "northNode") return "North Node";
  if (planet === "southNode") return "South Node";
  return capitalize(planet);
}

function formatAspectName(aspect: AspectType): string {
  return capitalize(aspect);
}

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function lowerFirst(value: string): string {
  return value.charAt(0).toLowerCase() + value.slice(1);
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values));
}
