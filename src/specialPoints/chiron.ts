import { PlanetPosition, createPlanetPosition } from "../core";

export interface ChironPoint {
  chiron: PlanetPosition;
}

export interface ChironMeaning {
  coreMeaning: string;
  psychologicalFunction: string;
  spiritualFunction: string;
  shadowExpression: string;
  healingPath: string;
  keywords: string[];
}

export const chironMeaning: ChironMeaning = {
  coreMeaning: "Chiron represents the sacred wound, the place where pain becomes medicine, teaching, compassion, and embodied wisdom.",
  psychologicalFunction: "It describes a tender pattern where sensitivity, inadequacy, rejection, or old injury may become a doorway into healing intelligence.",
  spiritualFunction: "Chiron is the initiatory bridge between wound and gift, showing where the soul learns to transmit medicine through lived experience rather than theory.",
  shadowExpression: "Over-identifying with woundedness, rescuing others to avoid one's own pain, or hiding the medicine because the original wound still feels too exposed.",
  healingPath: "Meet the wound with patience, let compassion become embodied practice, and allow earned wisdom to become service without self-abandonment.",
  keywords: ["wound", "healing", "medicine", "compassion", "initiation", "wisdom"],
};

export function createChironPoint(
  longitude: number,
  house?: number,
  retrograde = false
): ChironPoint {
  return {
    chiron: createPlanetPosition(longitude, retrograde, house as never),
  };
}
