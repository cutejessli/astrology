// ============================================================
// Natal Chart Synthesis and Interpretation Engine
// ============================================================

import { NatalChart, Planet, PlanetPosition, ZodiacSign } from "../core";
import { planetMeanings, PlanetMeaning } from "./planets";
import { signMeanings, SignMeaning } from "./signs";
import { houseMeanings, HouseMeaning } from "./houses";
import { joinSentences, lowerFirst, reduceReportLanguage } from "./voice";

export interface InterpretationSection {
  title: string;
  body: string;
  keywords: string[];
  weight: number;
}

export interface NatalInterpretation {
  summary: string;
  sections: InterpretationSection[];
}

/**
 * Interpret a natal chart by synthesizing planetary, sign, and optional house meanings.
 * Currently interprets the five personal planets: Sun, Moon, Mercury, Venus, Mars.
 */
export function interpretNatalChart(chart: NatalChart): NatalInterpretation {
  const sections: InterpretationSection[] = [];

  const personalPlanets: Planet[] = ["sun", "moon", "mercury", "venus", "mars"];

  for (const planet of personalPlanets) {
    const position = chart.planets[planet];
    const section = synthesizePlanetPlacement(planet, position);
    sections.push(section);
  }

  const summary = createChartSummary(chart);

  return {
    summary,
    sections,
  };
}

/**
 * Synthesize one planet placement into a complete interpretation section.
 * If house data is present, it blends planet + sign + house.
 * If house data is absent, it gracefully falls back to planet + sign only.
 */
function synthesizePlanetPlacement(
  planet: Planet,
  position: PlanetPosition
): InterpretationSection {
  const planetMeaning = planetMeanings[planet];
  const signMeaning = signMeanings[position.sign];
  const houseMeaning = position.house ? houseMeanings[position.house] : undefined;

  const title = createSectionTitle(
    planet,
    position.sign,
    planetMeaning,
    signMeaning,
    houseMeaning
  );

  const body = synthesizeBody(
    planet,
    position.sign,
    planetMeaning,
    signMeaning,
    houseMeaning
  );

  const keywords = unique([
    ...planetMeaning.keywords.slice(0, 3),
    ...signMeaning.keywords.slice(0, 2),
    ...(houseMeaning ? houseMeaning.keywords.slice(0, 2) : []),
  ]);

  const weights: Record<Planet, number> = {
    sun: 5,
    moon: 4,
    mercury: 3,
    venus: 2,
    mars: 1,
    jupiter: 0,
    saturn: 0,
    uranus: 0,
    neptune: 0,
    pluto: 0,
  };

  return {
    title,
    body,
    keywords,
    weight: weights[planet],
  };
}

function createSectionTitle(
  planet: Planet,
  sign: ZodiacSign,
  planetMeaning: PlanetMeaning,
  signMeaning: SignMeaning,
  houseMeaning?: HouseMeaning
): string {
  const planetName = capitalizeFirst(planet);
  const archetype = extractArchetypeName(signMeaning.coreArchetype);
  const planetConcept = extractKeywordFromMeaning(planetMeaning.coreMeaning);

  if (houseMeaning) {
    return `${planetName} in ${sign} in ${houseMeaning.title} — ${archetype} of ${planetConcept}`;
  }

  return `${planetName} in ${sign} — ${archetype} of ${planetConcept}`;
}

function synthesizeBody(
  planet: Planet,
  sign: ZodiacSign,
  planetMeaning: PlanetMeaning,
  signMeaning: SignMeaning,
  houseMeaning?: HouseMeaning
): string {
  const sections = [
    synthesizeOpening(planet, sign, planetMeaning, signMeaning, houseMeaning),
    synthesizeCoreExpression(planet, sign, planetMeaning, signMeaning, houseMeaning),
    synthesizePsychological(planet, sign, signMeaning, houseMeaning),
    synthesizeSpiritual(planetMeaning, signMeaning, houseMeaning),
    synthesizeIntegration(planetMeaning, signMeaning, houseMeaning),
  ];

  return reduceReportLanguage(joinSentences(sections));
}

function synthesizeOpening(
  planet: Planet,
  sign: ZodiacSign,
  planetMeaning: PlanetMeaning,
  signMeaning: SignMeaning,
  houseMeaning?: HouseMeaning
): string {
  const planetName = capitalizeFirst(planet);
  const archetype = extractArchetypeName(signMeaning.coreArchetype).toLowerCase();
  const coreNoun = extractCoreNoun(planetMeaning.coreMeaning);
  const housePhrase = houseMeaning
    ? `, especially through ${houseMeaning.lifeArea.toLowerCase()}`
    : "";

  return `Your ${planetName} in ${sign} carries the ${archetype} current, giving your ${coreNoun} a distinctly ${sign.toLowerCase()} rhythm${housePhrase}.`;
}

function synthesizeCoreExpression(
  planet: Planet,
  sign: ZodiacSign,
  planetMeaning: PlanetMeaning,
  signMeaning: SignMeaning,
  houseMeaning?: HouseMeaning
): string {
  const planetName = capitalizeFirst(planet);
  const houseLayer = houseMeaning
    ? ` In everyday life, this tends to show up around ${houseMeaning.coreTheme.toLowerCase()}.`
    : "";

  return `${planetName} wants to express ${lowerFirst(extractCoreNoun(planetMeaning.psychologicalFunction))}; ${sign} gives that expression the texture of ${lowerFirst(signMeaning.psychologicalExpression)}.${houseLayer}`;
}

function synthesizePsychological(
  planet: Planet,
  sign: ZodiacSign,
  signMeaning: SignMeaning,
  houseMeaning?: HouseMeaning
): string {
  const planetName = capitalizeFirst(planet);
  const houseLayer = houseMeaning
    ? ` The ${houseMeaning.title.toLowerCase()} adds another layer: ${lowerFirst(houseMeaning.psychologicalExpression)}.`
    : "";

  return `Psychologically, this part of you learns by letting ${planetName} move through ${sign}'s lens of ${lowerFirst(signMeaning.psychologicalExpression)}.${houseLayer}`;
}

function synthesizeSpiritual(
  planetMeaning: PlanetMeaning,
  signMeaning: SignMeaning,
  houseMeaning?: HouseMeaning
): string {
  const houseLayer = houseMeaning
    ? ` The house brings the lesson into ${lowerFirst(houseMeaning.spiritualExpression)}.`
    : "";

  return `Spiritually, the invitation is to let ${lowerFirst(signMeaning.spiritualExpression)} become part of how you embody ${extractCoreNoun(planetMeaning.spiritualFunction)}.${houseLayer}`;
}

function synthesizeIntegration(
  planetMeaning: PlanetMeaning,
  signMeaning: SignMeaning,
  houseMeaning?: HouseMeaning
): string {
  const houseShadow = houseMeaning
    ? ` In this area of life, the shadow can also show up as ${lowerFirst(houseMeaning.shadowExpression)}.`
    : "";
  const houseHealing = houseMeaning
    ? ` A practical doorway is to ${lowerFirst(houseMeaning.healingPath)}.`
    : "";

  return `The shadow appears when ${lowerFirst(planetMeaning.shadowExpression)} gets tangled with ${lowerFirst(signMeaning.shadowExpression)}.${houseShadow} The medicine is to ${lowerFirst(planetMeaning.healingPath)} while also ${lowerFirst(signMeaning.healingPath)}.${houseHealing}`;
}

function createChartSummary(chart: NatalChart): string {
  const sunSign = chart.planets.sun.sign;
  const moonSign = chart.planets.moon.sign;
  const mercurySign = chart.planets.mercury.sign;
  const venusSign = chart.planets.venus.sign;
  const marsSign = chart.planets.mars.sign;

  const sunArchetype = extractArchetypeName(signMeanings[sunSign].coreArchetype);
  const moonArchetype = extractArchetypeName(signMeanings[moonSign].coreArchetype);
  const mercuryArchetype = extractArchetypeName(signMeanings[mercurySign].coreArchetype);
  const venusArchetype = extractArchetypeName(signMeanings[venusSign].coreArchetype);
  const marsArchetype = extractArchetypeName(signMeanings[marsSign].coreArchetype);

  const houseSummary = chart.houses
    ? ` Because house placements are included, the reading also shows where these energies tend to become visible in real life.`
    : "";

  return joinSentences([
    `Your natal chart is a symbolic map of consciousness, not a fixed sentence or a locked fate`,
    `At the center, your Sun in ${sunSign} carries the ${sunArchetype.toLowerCase()} current, while your Moon in ${moonSign} shows an inner world shaped by the ${moonArchetype.toLowerCase()}`,
    `Mercury in ${mercurySign} describes the way your mind connects and translates experience; Venus in ${venusSign} shows how love, beauty, and receptivity move through you; Mars in ${marsSign} shows how desire, courage, and action gather momentum`,
    houseSummary,
    `Together, these placements are invitations: living patterns you can notice, refine, and embody with more clarity over time`,
  ]);
}

function extractArchetypeName(archetype: string): string {
  return archetype.split("—")[0].trim();
}

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
  ];

  for (const keyword of keywords) {
    if (meaning.toLowerCase().includes(keyword)) {
      return capitalizeFirst(keyword);
    }
  }

  return capitalizeFirst(meaning.split(" ")[0]);
}

function extractCoreNoun(text: string): string {
  if (text.includes("essential")) return "essential inner force";
  if (text.includes("emotional")) return "emotional depth";
  if (text.includes("communication")) return "authentic expression";
  if (text.includes("love")) return "relational connection";
  if (text.includes("action")) return "purposeful action";

  return text.split(/[,.]/)[0].trim().toLowerCase();
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values));
}
