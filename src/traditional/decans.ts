import { Planet, PlanetPosition, ZodiacSign } from "../core";

export type DecanNumber = 1 | 2 | 3;

export interface DecanAssessment {
  sign: ZodiacSign;
  degree: number;
  decan: DecanNumber;
  traditionalRuler: Planet;
  theme: string;
  keywords: string[];
}

export const decanRulers: Record<ZodiacSign, Record<DecanNumber, Planet>> = {
  Aries: { 1: "mars", 2: "sun", 3: "venus" },
  Taurus: { 1: "mercury", 2: "moon", 3: "saturn" },
  Gemini: { 1: "jupiter", 2: "mars", 3: "sun" },
  Cancer: { 1: "venus", 2: "mercury", 3: "moon" },
  Leo: { 1: "saturn", 2: "jupiter", 3: "mars" },
  Virgo: { 1: "sun", 2: "venus", 3: "mercury" },
  Libra: { 1: "moon", 2: "saturn", 3: "jupiter" },
  Scorpio: { 1: "mars", 2: "sun", 3: "venus" },
  Sagittarius: { 1: "mercury", 2: "moon", 3: "saturn" },
  Capricorn: { 1: "jupiter", 2: "mars", 3: "sun" },
  Aquarius: { 1: "venus", 2: "mercury", 3: "moon" },
  Pisces: { 1: "saturn", 2: "jupiter", 3: "mars" },
};

export const decanThemes: Record<ZodiacSign, Record<DecanNumber, { theme: string; keywords: string[] }>> = {
  Aries: {
    1: { theme: "raw ignition, direct will, first emergence", keywords: ["initiation", "courage", "will"] },
    2: { theme: "radiant leadership, creative self-assertion, solar courage", keywords: ["leadership", "visibility", "confidence"] },
    3: { theme: "desire refined through relationship, attraction, and chosen values", keywords: ["desire", "values", "attraction"] },
  },
  Taurus: {
    1: { theme: "embodied intelligence, resourcefulness, and practical perception", keywords: ["body", "resources", "perception"] },
    2: { theme: "emotional cultivation, nourishment, and fertile continuity", keywords: ["nourishment", "fertility", "security"] },
    3: { theme: "lasting structure, endurance, and the discipline of stewardship", keywords: ["stewardship", "endurance", "structure"] },
  },
  Gemini: {
    1: { theme: "meaningful communication, curiosity, and conceptual expansion", keywords: ["curiosity", "language", "meaning"] },
    2: { theme: "sharp exchange, debate, movement, and active mental friction", keywords: ["debate", "movement", "agility"] },
    3: { theme: "creative intelligence, expressive thought, and radiant voice", keywords: ["voice", "expression", "intelligence"] },
  },
  Cancer: {
    1: { theme: "relational care, emotional bonding, and beauty as sanctuary", keywords: ["care", "bonding", "sanctuary"] },
    2: { theme: "emotional memory, ancestral language, and intimate communication", keywords: ["memory", "ancestry", "communication"] },
    3: { theme: "deep feeling, instinctive protection, and lunar belonging", keywords: ["belonging", "protection", "feeling"] },
  },
  Leo: {
    1: { theme: "creative authority shaped through discipline and responsibility", keywords: ["authority", "discipline", "creation"] },
    2: { theme: "generous radiance, noble vision, and expansive self-expression", keywords: ["generosity", "vision", "radiance"] },
    3: { theme: "heroic action, courageous display, and passionate embodiment", keywords: ["heroism", "passion", "embodiment"] },
  },
  Virgo: {
    1: { theme: "clarifying intelligence, devotion to craft, and solar discernment", keywords: ["discernment", "craft", "clarity"] },
    2: { theme: "healing through refinement, relational service, and embodied beauty", keywords: ["healing", "service", "refinement"] },
    3: { theme: "precise language, sacred analysis, and technical mastery", keywords: ["precision", "analysis", "mastery"] },
  },
  Libra: {
    1: { theme: "emotional balance, relational sensitivity, and reflective harmony", keywords: ["balance", "sensitivity", "harmony"] },
    2: { theme: "mature justice, ethical structure, and committed reciprocity", keywords: ["justice", "commitment", "ethics"] },
    3: { theme: "expansive diplomacy, wisdom through relationship, and social vision", keywords: ["diplomacy", "wisdom", "relationship"] },
  },
  Scorpio: {
    1: { theme: "raw depth, courage under pressure, and instinctive transformation", keywords: ["depth", "courage", "transformation"] },
    2: { theme: "illumination of shadow, sovereign intensity, and creative regeneration", keywords: ["shadow", "sovereignty", "regeneration"] },
    3: { theme: "magnetic intimacy, desire alchemy, and value transformation", keywords: ["intimacy", "magnetism", "alchemy"] },
  },
  Sagittarius: {
    1: { theme: "restless learning, sacred translation, and meaningful movement", keywords: ["learning", "translation", "movement"] },
    2: { theme: "instinctive faith, emotional questing, and belonging through horizon", keywords: ["faith", "quest", "horizon"] },
    3: { theme: "disciplined wisdom, structured belief, and responsible expansion", keywords: ["wisdom", "belief", "responsibility"] },
  },
  Capricorn: {
    1: { theme: "visionary building, long-range growth, and meaningful ambition", keywords: ["ambition", "growth", "vision"] },
    2: { theme: "strategic effort, courageous endurance, and disciplined action", keywords: ["strategy", "effort", "endurance"] },
    3: { theme: "earned authority, public purpose, and solar mastery", keywords: ["authority", "purpose", "mastery"] },
  },
  Aquarius: {
    1: { theme: "relational idealism, social magnetism, and values reimagined", keywords: ["idealism", "community", "values"] },
    2: { theme: "inventive language, future thought, and connective intelligence", keywords: ["innovation", "language", "future"] },
    3: { theme: "collective feeling, intuitive networks, and emotional futurism", keywords: ["network", "intuition", "collective"] },
  },
  Pisces: {
    1: { theme: "spiritual discipline, solitude, and compassionate boundaries", keywords: ["solitude", "discipline", "boundaries"] },
    2: { theme: "mystical abundance, faith, and expansive compassion", keywords: ["compassion", "faith", "abundance"] },
    3: { theme: "active surrender, dream courage, and spiritual action", keywords: ["surrender", "dream", "action"] },
  },
};

export function getDecanNumber(degreeInSign: number): DecanNumber {
  if (degreeInSign < 10) return 1;
  if (degreeInSign < 20) return 2;
  return 3;
}

export function assessDecan(position: PlanetPosition): DecanAssessment {
  const decan = getDecanNumber(position.degree);
  const theme = decanThemes[position.sign][decan];

  return {
    sign: position.sign,
    degree: position.degree,
    decan,
    traditionalRuler: decanRulers[position.sign][decan],
    theme: theme.theme,
    keywords: theme.keywords,
  };
}
