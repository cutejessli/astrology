import { ZodiacSign } from "../core";
import type { LunarNode } from "../nodeAxis";

export interface NodeMeaning {
  coreMeaning: string;
  psychologicalFunction: string;
  spiritualFunction: string;
  shadowExpression: string;
  healingPath: string;
  keywords: string[];
}

export const nodeMeanings: Record<LunarNode, NodeMeaning> = {
  northNode: {
    coreMeaning: "The growth direction, learning edge, and unfamiliar path of becoming.",
    psychologicalFunction: "The qualities that feel compelling but not fully comfortable yet; the direction that stretches identity beyond old reflexes.",
    spiritualFunction: "The chosen horizon for growth, purpose, embodiment, and future-facing integration.",
    shadowExpression: "Rushing growth, overcorrecting away from the past, or forcing change before integration is ready.",
    healingPath: "Move toward new capacities gradually, with courage, humility, and embodied practice.",
    keywords: ["growth", "direction", "evolution", "future", "purpose", "becoming"],
  },
  southNode: {
    coreMeaning: "The familiar pattern, inherited skill, and comfort zone.",
    psychologicalFunction: "The patterns that feel automatic, safe, overdeveloped, or unconsciously repeated from earlier conditioning.",
    spiritualFunction: "The memory bank of gifts, old mastery, and patterns asking to be integrated rather than abandoned.",
    shadowExpression: "Remaining stuck in familiarity, repeating inherited scripts, or using old gifts as a hiding place from growth.",
    healingPath: "Honor what has been mastered while releasing over-identification with the old pattern.",
    keywords: ["past", "memory", "familiarity", "inheritance", "release", "integration"],
  },
};

export const nodeAxisThemes: Record<ZodiacSign, string> = {
  Aries: "from dependency or excessive accommodation toward courage, self-trust, and direct initiation",
  Taurus: "from crisis, entanglement, or intensity toward peace, embodiment, simplicity, and self-worth",
  Gemini: "from certainty or dogma toward curiosity, dialogue, listening, and flexible understanding",
  Cancer: "from hard achievement or emotional distance toward belonging, tenderness, roots, and emotional honesty",
  Leo: "from detachment or hiding in the group toward creative visibility, joy, and heart-led expression",
  Virgo: "from diffusion or escape toward discernment, craft, service, and embodied healing",
  Libra: "from isolated self-assertion toward reciprocity, diplomacy, partnership, and relational wisdom",
  Scorpio: "from comfort, accumulation, or stagnation toward depth, intimacy, surrender, and transformation",
  Sagittarius: "from scattered information toward wisdom, meaning, lived truth, and the courage of vision",
  Capricorn: "from emotional dependency or private retreat toward maturity, structure, vocation, and public responsibility",
  Aquarius: "from personal drama or excessive self-focus toward collective vision, friendship, innovation, and shared future",
  Pisces: "from control, perfectionism, or over-analysis toward surrender, compassion, imagination, and spiritual trust",
};

export function getNodeAxisTheme(northNodeSign: ZodiacSign): string {
  return nodeAxisThemes[northNodeSign];
}
