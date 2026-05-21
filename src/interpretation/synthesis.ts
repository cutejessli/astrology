// ============================================================
// Natal Chart Synthesis and Interpretation Engine
// ============================================================

import { NatalChart, Planet, ZodiacSign } from "../core";
import { planetMeanings, PlanetMeaning } from "./planets";
import { signMeanings, SignMeaning } from "./signs";

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
 * Interpret a natal chart by synthesizing planetary and sign meanings.
 * Currently interprets the five personal planets: Sun, Moon, Mercury, Venus, Mars.
 */
export function interpretNatalChart(chart: NatalChart): NatalInterpretation {
  const sections: InterpretationSection[] = [];

  // Define the personal planets in order of interpretation importance
  const personalPlanets: Planet[] = ["sun", "moon", "mercury", "venus", "mars"];

  // Interpret each planet in its sign
  for (const planet of personalPlanets) {
    const position = chart.planets[planet];
    const section = synthesizePlanetInSign(planet, position.sign);
    sections.push(section);
  }

  // Create an opening summary that frames the chart as consciousness map
  const summary = createChartSummary(chart);

  return {
    summary,
    sections,
  };
}

/**
 * Synthesize a single planet in a sign into a complete interpretation section.
 */
function synthesizePlanetInSign(planet: Planet, sign: ZodiacSign): InterpretationSection {
  const planetMeaning = planetMeanings[planet];
  const signMeaning = signMeanings[sign];

  // Create title with poetic archetype blend
  const title = createSectionTitle(planet, sign, planetMeaning, signMeaning);

  // Create body that synthesizes all dimensions
  const body = synthesizeBody(planet, sign, planetMeaning, signMeaning);

  // Combine keywords with weight toward planetary meaning
  const keywords = [
    ...planetMeaning.keywords.slice(0, 3),
    ...signMeaning.keywords.slice(0, 2),
  ];

  // Weight determines section prominence (Sun most important, Mars least)
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

/**
 * Create a meaningful title that blends planet and sign archetypes.
 */
function createSectionTitle(
  planet: Planet,
  sign: ZodiacSign,
  planetMeaning: PlanetMeaning,
  signMeaning: SignMeaning
): string {
  const planetName = capitalizeFirst(planet);
  const archetype = extractArchetypeName(signMeaning.coreArchetype);

  // Extract key concept from planet or sign
  const planetConcept = extractKeywordFromMeaning(planetMeaning.coreMeaning);

  return `${planetName} in ${sign} — ${archetype} of ${planetConcept}`;
}

/**
 * Extract archetype name (text before the em dash)
 */
function extractArchetypeName(archetype: string): string {
  const match = archetype.split("—")[0].trim();
  return match;
}

/**
 * Extract a key concept from meaning text
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
  ];

  for (const keyword of keywords) {
    if (meaning.toLowerCase().includes(keyword)) {
      return capitalizeFirst(keyword);
    }
  }

  // Fallback: extract first substantive word
  const words = meaning.split(" ");
  return capitalizeFirst(words[0]);
}

/**
 * Synthesize planet + sign meanings into coherent body text.
 */
function synthesizeBody(
  planet: Planet,
  sign: ZodiacSign,
  planetMeaning: PlanetMeaning,
  signMeaning: SignMeaning
): string {
  const sections: string[] = [];

  // Opening: blend planet essence with sign expression
  const opening = synthesizeOpening(planet, sign, planetMeaning, signMeaning);
  sections.push(opening);

  // Core expression: how this planet functions through this sign
  const coreExpression = synthesizeCoreExpression(planet, sign, planetMeaning, signMeaning);
  sections.push(coreExpression);

  // Psychological dimension: how it shows up in psyche
  const psychological = synthesizePsychological(
    planet,
    sign,
    planetMeaning,
    signMeaning
  );
  sections.push(psychological);

  // Spiritual dimension: higher potential
  const spiritual = synthesizeSpiritual(planet, sign, planetMeaning, signMeaning);
  sections.push(spiritual);

  // Shadow and integration: both sides and path forward
  const integration = synthesizeIntegration(planet, sign, planetMeaning, signMeaning);
  sections.push(integration);

  return sections.join(" ");
}

/**
 * Create opening that establishes the planet-sign synthesis.
 */
function synthesizeOpening(
  planet: Planet,
  sign: ZodiacSign,
  planetMeaning: PlanetMeaning,
  signMeaning: SignMeaning
): string {
  const planetName = capitalizeFirst(planet);
  const archetype = extractArchetypeName(signMeaning.coreArchetype).toLowerCase();

  // Vary opening based on planet to avoid repetition
  const openings = [
    `Your ${planetName} in ${sign} expresses ${extractCoreNoun(
      planetMeaning.coreMeaning
    )} as ${archetype}.`,
    `In ${sign}, your ${planetName} becomes ${archetype}, channeling the energy of ${extractCoreNoun(
      planetMeaning.coreMeaning
    )}.`,
    `The ${archetype} archetype infuses your ${planetName}, creating an expression of ${extractCoreNoun(
      planetMeaning.coreMeaning
    )} that is distinctly ${sign.toLowerCase()}.`,
  ];

  const index = (planet.charCodeAt(0) + sign.charCodeAt(0)) % openings.length;
  return openings[index];
}

/**
 * Extract core noun from a longer phrase
 */
function extractCoreNoun(text: string): string {
  // Look for the first capitalized concept or key noun
  if (text.includes("essential")) return "essential inner force";
  if (text.includes("emotional")) return "emotional depth";
  if (text.includes("communication")) return "authentic expression";
  if (text.includes("love")) return "relational connection";
  if (text.includes("action")) return "purposeful action";

  // Fallback to first phrase before a period or comma
  const phrase = text.split(/[,.]/)[0].trim();
  return phrase.toLowerCase();
}

/**
 * Synthesize core expression of planet through sign.
 */
function synthesizeCoreExpression(
  planet: Planet,
  sign: ZodiacSign,
  planetMeaning: PlanetMeaning,
  signMeaning: SignMeaning
): string {
  return `The ${sign} influence shapes how your ${capitalizeFirst(
    planet
  )} operates: ${signMeaning.psychologicalExpression.toLowerCase()} becomes the vehicle through which ${extractCoreNoun(
    planetMeaning.psychologicalFunction
  )} expresses itself.`;
}

/**
 * Synthesize psychological expression.
 */
function synthesizePsychological(
  planet: Planet,
  sign: ZodiacSign,
  planetMeaning: PlanetMeaning,
  signMeaning: SignMeaning
): string {
  const planetName = capitalizeFirst(planet);
  return `Psychologically, this placement invites you to develop your ${planetName} through ${sign}'s particular lens: ${signMeaning.psychologicalExpression.toLowerCase()}.`;
}

/**
 * Synthesize spiritual expression.
 */
function synthesizeSpiritual(
  planet: Planet,
  sign: ZodiacSign,
  planetMeaning: PlanetMeaning,
  signMeaning: SignMeaning
): string {
  return `Spiritually, this is an invitation to understand ${signMeaning.spiritualExpression.toLowerCase()} as inseparable from ${extractCoreNoun(
    planetMeaning.spiritualFunction
  )}.`;
}

/**
 * Synthesize shadow work and integration path.
 */
function synthesizeIntegration(
  planet: Planet,
  sign: ZodiacSign,
  planetMeaning: PlanetMeaning,
  signMeaning: SignMeaning
): string {
  const sections: string[] = [];

  sections.push(
    `The shadow appears when ${planetMeaning.shadowExpression.toLowerCase()} combines with ${signMeaning.shadowExpression.toLowerCase()}.`
  );

  sections.push(
    `Your healing path integrates both energies: ${planetMeaning.healingPath.toLowerCase()} while honoring ${signMeaning.growthPath.toLowerCase()}.`
  );

  return sections.join(" ");
}

/**
 * Create the summary paragraph framing the chart as consciousness map.
 */
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

  const sections: string[] = [];

  sections.push(
    `Your natal chart is a symbolic map of your consciousness—not a fixed destiny, but a dynamic field of potential.`
  );

  sections.push(
    `At your core (Sun in ${sunSign}), you are the ${sunArchetype.toLowerCase()}, bringing your essential self into being. Your inner world (Moon in ${moonSign}) responds through the lens of the ${moonArchetype.toLowerCase()}, seeking ${extractCoreNounFromArchetype(
      moonArchetype
    ).toLowerCase()}.`
  );

  sections.push(
    `How you think and connect is shaped by the ${mercuryArchetype.toLowerCase()} (Mercury in ${mercurySign}). How you love is expressed through the ${venusArchetype.toLowerCase()} (Venus in ${venusSign}). How you act is channeled through the ${marsArchetype.toLowerCase()} (Mars in ${marsSign}).`
  );

  sections.push(
    `These aren't constraints but invitations—potentials waiting for your conscious engagement. Your growth lies in understanding these energies and learning to express them with intention and wisdom.`
  );

  return sections.join(" ");
}

/**
 * Extract core concept from archetype name for summary context.
 */
function extractCoreNounFromArchetype(archetype: string): string {
  const mappings: Record<string, string> = {
    Initiator: "initiation",
    Consolidator: "stability",
    Translator: "connection",
    Nurturer: "belonging",
    Creator: "expression",
    Analyst: "understanding",
    Arbiter: "balance",
    Alchemist: "transformation",
    Seeker: "meaning",
    Builder: "structure",
    Revolutionary: "evolution",
    Mystic: "unity",
  };

  return mappings[archetype] || "expression";
}

/**
 * Helper: Capitalize first letter of string
 */
function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
