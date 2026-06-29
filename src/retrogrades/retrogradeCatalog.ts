import type { RetrogradeEvent } from "./types";

export const RETROGRADE_CATALOG = {
  "mercury-retrograde-2026-cancer": {
    id: "mercury-retrograde-2026-cancer",
    planet: "Mercury",
    sign: "Cancer",
    startDate: "2026-06-29",
    directDate: "2026-07-23",
    postShadowEndDate: "2026-08-06",
    stationRetrogradeDegree: 26.25,
    stationDirectDegree: 16.32,
    overview:
      "Mercury retrograde in Cancer invites a review of communication, decisions, plans, and memories connected with emotional security, family, home, belonging, and the ways we protect what matters. It is a useful period for revisiting unfinished conversations, repairing practical systems, and listening for what old feelings are trying to clarify before moving forward.",
  },
} as const satisfies Record<string, RetrogradeEvent>;

export type RetrogradeEventId = keyof typeof RETROGRADE_CATALOG;

export function getRetrogradeEvent(
  id: string
): RetrogradeEvent | undefined {
  return RETROGRADE_CATALOG[id as RetrogradeEventId];
}
