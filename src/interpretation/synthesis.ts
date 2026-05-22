// ============================================================
// Natal Chart Synthesis and Interpretation Engine
// ============================================================

import { NatalChart, Planet, PlanetPosition, ZodiacSign } from "../core";
import { planetMeanings, PlanetMeaning } from "./planets";
import { signMeanings, SignMeaning } from "./signs";
import { houseMeanings, HouseMeaning } from "./houses";

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
  const sections: string[] = [];

  sections.push(synthesizeOpening(planet, sign, planetMeaning, signMeaning, houseMeaning));
  sections.push(synthesizeCoreExpression(planet, sign, planetMeaning, signMeaning, houseMeaning));
  sections.push(synthesizePsychological(planet, sign, signMeaning, houseMeaning));
  sections.push(synthesizeSpiritual(planetMeaning, signMeaning, houseMeaning));
  sections.push(synthesizeIntegration(planetMeaning, signMeaning, houseMeaning));

  return sections.join(" ");
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
  const housePhrase = houseMeaning
    ? ` through the life arena of ${houseMeaning.lifeArea.toLowerCase()}`
    : "";

  const openings = [
    `Your ${planetName} in ${sign} expresses ${extractCoreNoun(
      planetMeaning.coreMeaning
    )} as ${archetype}${housePhrase}.`,
    `In ${sign}, your ${planetName} becomes ${archetype}, channeling the energy of ${extractCoreNoun(
      planetMeaning.coreMeaning
    )}${housePhrase}.`,
    `The ${archetype} archetype infuses your ${planetName}, creating an expression of ${extractCoreNoun(
      planetMeaning.coreMeaning
    )} that is distinctly ${sign.toLowerCase()}${housePhrase}.`,
  ];

  const index = (planet.charCodeAt(0) + sign.charCodeAt(0)) % openings.length;
  return openings[index];
}

function synthesizeCoreExpression(
  planet: Planet,
  sign: ZodiacSign,
  planetMeaning: PlanetMeaning,
  signMeaning: SignMeaning,
  houseMeaning?: HouseMeaning
): string {
  const placementContext = houseMeaning
    ? ` In the house of ${houseMeaning.title.toLowerCase()}, this energy concentrates around ${houseMeaning.coreTheme.toLowerCase()}`
    : "";

  return `The ${sign} influence shapes how your ${capitalizeFirst(
    planet
  )} operates: ${signMeaning.psychologicalExpression.toLowerCase()} becomes the vehicle through which ${extractCoreNoun(
    planetMeaning.psychologicalFunction
  )} expresses itself.${placementContext}`;
}

function synthesizePsychological(
  planet: Planet,
  sign: ZodiacSign,
  signMeaning: SignMeaning,
  houseMeaning?: HouseMeaning
): string {
  const planetName = capitalizeFirst(planet);
  const houseLayer = houseMeaning
    ? ` Psychologically, the ${houseMeaning.title.toLowerCase()} house adds this focus: ${houseMeaning.psychologicalExpression.toLowerCase()}`
    : "";

  return `Psychologically, this placement invites you to develop your ${planetName} through ${sign}'s particular lens: ${signMeaning.psychologicalExpression.toLowerCase()}.${houseLayer}`;
}

function synthesizeSpiritual(
  planetMeaning: PlanetMeaning,
  signMeaning: SignMeaning,
  houseMeaning?: HouseMeaning
): string {
  const houseLayer = houseMeaning
    ? ` The house layer adds: ${houseMeaning.spiritualExpression.toLowerCase()}`
    : "";

  return `Spiritually, this is an invitation to understand ${signMeaning.spiritualExpression.toLowerCase()} as inseparable from ${extractCoreNoun(
    planetMeaning.spiritualFunction
  )}.${houseLayer}`;
}

function synthesizeIntegration(
  planetMeaning: PlanetMeaning,
  signMeaning: SignMeaning,
  houseMeaning?: HouseMeaning
): string {
  const houseShadow = houseMeaning
    ? ` In this life area, the shadow may also appear as ${houseMeaning.shadowExpression.toLowerCase()}`
    : "";
  const houseHealing = houseMeaning
    ? ` The practical integration is to ${houseMeaning.healingPath.toLowerCase()}`
    : "";

  return `The shadow appears when ${planetMeaning.shadowExpression.toLowerCase()} combines with ${signMeaning.shadowExpression.toLowerCase()}.${houseShadow} Your healing path integrates both energies: ${planetMeaning.healingPath.toLowerCase()} while honoring ${signMeaning.healingPath.toLowerCase()}.${houseHealing}`;
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
    ? ` Because house placements are included, this reading also describes where these archetypal energies tend to express themselves in lived experience.`
    : "";

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
    `How you think and connect is shaped by the ${mercuryArchetype.toLowerCase()} (Mercury in ${mercurySign}). How you love is expressed through the ${venusArchetype.toLowerCase()} (Venus in ${venusSign}). How you act is channeled through the ${marsArchetype.toLowerCase()} (Mars in ${marsSign}).${houseSummary}`
  );

  sections.push(
    `These aren't constraints but invitations—potentials waiting for your conscious engagement. Your growth lies in understanding these energies and learning to express them with intention and wisdom.`
  );

  return sections.join(" ");
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

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function unique(values: string[]): string[] {
  return Array.from(new Set(values));
}
