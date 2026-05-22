import { Planet, PlanetPosition, ZodiacSign } from "../core";

export interface BoundRange {
  start: number;
  end: number;
  ruler: Planet;
}

export interface BoundAssessment {
  sign: ZodiacSign;
  degree: number;
  ruler: Planet;
  range: BoundRange;
  theme: string;
  keywords: string[];
}

// Egyptian bounds/terms using degree ranges within each sign.
// Ranges are start-inclusive and end-exclusive, except the final 30° boundary.
export const egyptianBounds: Record<ZodiacSign, BoundRange[]> = {
  Aries: [
    { start: 0, end: 6, ruler: "jupiter" },
    { start: 6, end: 14, ruler: "venus" },
    { start: 14, end: 21, ruler: "mercury" },
    { start: 21, end: 26, ruler: "mars" },
    { start: 26, end: 30, ruler: "saturn" },
  ],
  Taurus: [
    { start: 0, end: 8, ruler: "venus" },
    { start: 8, end: 15, ruler: "mercury" },
    { start: 15, end: 22, ruler: "jupiter" },
    { start: 22, end: 27, ruler: "saturn" },
    { start: 27, end: 30, ruler: "mars" },
  ],
  Gemini: [
    { start: 0, end: 6, ruler: "mercury" },
    { start: 6, end: 12, ruler: "jupiter" },
    { start: 12, end: 17, ruler: "venus" },
    { start: 17, end: 24, ruler: "mars" },
    { start: 24, end: 30, ruler: "saturn" },
  ],
  Cancer: [
    { start: 0, end: 7, ruler: "mars" },
    { start: 7, end: 13, ruler: "venus" },
    { start: 13, end: 19, ruler: "mercury" },
    { start: 19, end: 26, ruler: "jupiter" },
    { start: 26, end: 30, ruler: "saturn" },
  ],
  Leo: [
    { start: 0, end: 6, ruler: "jupiter" },
    { start: 6, end: 13, ruler: "venus" },
    { start: 13, end: 19, ruler: "saturn" },
    { start: 19, end: 25, ruler: "mercury" },
    { start: 25, end: 30, ruler: "mars" },
  ],
  Virgo: [
    { start: 0, end: 7, ruler: "mercury" },
    { start: 7, end: 13, ruler: "venus" },
    { start: 13, end: 17, ruler: "jupiter" },
    { start: 17, end: 21, ruler: "mars" },
    { start: 21, end: 30, ruler: "saturn" },
  ],
  Libra: [
    { start: 0, end: 6, ruler: "saturn" },
    { start: 6, end: 14, ruler: "mercury" },
    { start: 14, end: 21, ruler: "jupiter" },
    { start: 21, end: 28, ruler: "venus" },
    { start: 28, end: 30, ruler: "mars" },
  ],
  Scorpio: [
    { start: 0, end: 7, ruler: "mars" },
    { start: 7, end: 11, ruler: "venus" },
    { start: 11, end: 19, ruler: "mercury" },
    { start: 19, end: 24, ruler: "jupiter" },
    { start: 24, end: 30, ruler: "saturn" },
  ],
  Sagittarius: [
    { start: 0, end: 12, ruler: "jupiter" },
    { start: 12, end: 17, ruler: "venus" },
    { start: 17, end: 21, ruler: "mercury" },
    { start: 21, end: 26, ruler: "saturn" },
    { start: 26, end: 30, ruler: "mars" },
  ],
  Capricorn: [
    { start: 0, end: 7, ruler: "mercury" },
    { start: 7, end: 14, ruler: "jupiter" },
    { start: 14, end: 22, ruler: "venus" },
    { start: 22, end: 26, ruler: "saturn" },
    { start: 26, end: 30, ruler: "mars" },
  ],
  Aquarius: [
    { start: 0, end: 7, ruler: "mercury" },
    { start: 7, end: 13, ruler: "venus" },
    { start: 13, end: 20, ruler: "jupiter" },
    { start: 20, end: 25, ruler: "mars" },
    { start: 25, end: 30, ruler: "saturn" },
  ],
  Pisces: [
    { start: 0, end: 12, ruler: "venus" },
    { start: 12, end: 16, ruler: "jupiter" },
    { start: 16, end: 19, ruler: "mercury" },
    { start: 19, end: 28, ruler: "mars" },
    { start: 28, end: 30, ruler: "saturn" },
  ],
};

export const boundThemes: Record<Planet, { theme: string; keywords: string[] }> = {
  sun: {
    theme: "visibility, vitality, and conscious selfhood",
    keywords: ["visibility", "vitality", "selfhood"],
  },
  moon: {
    theme: "feeling, memory, embodiment, and instinctive response",
    keywords: ["feeling", "memory", "instinct"],
  },
  mercury: {
    theme: "perception, language, analysis, and adaptive intelligence",
    keywords: ["perception", "language", "analysis"],
  },
  venus: {
    theme: "value, attraction, harmony, pleasure, and relational magnetism",
    keywords: ["value", "harmony", "attraction"],
  },
  mars: {
    theme: "courage, action, heat, conflict, and decisive movement",
    keywords: ["action", "courage", "heat"],
  },
  jupiter: {
    theme: "growth, meaning, faith, wisdom, and expansive confidence",
    keywords: ["growth", "meaning", "faith"],
  },
  saturn: {
    theme: "structure, boundaries, time, discipline, and earned maturity",
    keywords: ["structure", "boundaries", "discipline"],
  },
  uranus: {
    theme: "awakening, disruption, innovation, and liberation",
    keywords: ["awakening", "innovation", "liberation"],
  },
  neptune: {
    theme: "mysticism, imagination, compassion, and surrender",
    keywords: ["mysticism", "imagination", "surrender"],
  },
  pluto: {
    theme: "shadow, power, transformation, and regeneration",
    keywords: ["shadow", "power", "transformation"],
  },
};

export function assessBound(position: PlanetPosition): BoundAssessment {
  const bounds = egyptianBounds[position.sign];
  const range = bounds.find((bound) => position.degree >= bound.start && position.degree < bound.end) ?? bounds[bounds.length - 1];
  const theme = boundThemes[range.ruler];

  return {
    sign: position.sign,
    degree: position.degree,
    ruler: range.ruler,
    range,
    theme: theme.theme,
    keywords: theme.keywords,
  };
}
