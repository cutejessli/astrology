import { PlanetPosition, createPlanetPosition } from "../core";

export interface LilithPoint {
  lilith: PlanetPosition;
}

export interface LilithMeaning {
  coreMeaning: string;
  psychologicalFunction: string;
  spiritualFunction: string;
  shadowExpression: string;
  healingPath: string;
  keywords: string[];
}

export const lilithMeaning: LilithMeaning = {
  coreMeaning: "Black Moon Lilith represents the wild, exiled, uncompromising feminine principle: instinct, refusal, taboo truth, sovereignty, and the parts of the psyche that will not be domesticated.",
  psychologicalFunction: "It describes where shame, rejection, desire, rage, or refusal may gather around a person's instinctive power and unedited truth.",
  spiritualFunction: "Lilith is the initiatory force of sacred autonomy, shadow integration, erotic life force, and the reclamation of what was cast out or silenced.",
  shadowExpression: "Reactive defiance, self-exile, fear of vulnerability, destructive seduction, or identifying so strongly with rejection that intimacy becomes threatening.",
  healingPath: "Reclaim the exiled instinct without letting pain harden into isolation. Let sovereignty become embodied truth, not endless opposition.",
  keywords: ["sovereignty", "shadow", "instinct", "taboo", "refusal", "reclamation"],
};

export function createLilithPoint(
  longitude: number,
  house?: number,
  retrograde = false
): LilithPoint {
  return {
    lilith: createPlanetPosition(longitude, retrograde, house as never),
  };
}
