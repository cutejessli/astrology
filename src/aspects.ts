// ============================================================
// Aspect Engine v1
// ============================================================

import { NatalChart, Planet } from "./core";

export type AspectType =
  | "conjunction"
  | "opposition"
  | "trine"
  | "square"
  | "sextile";

export interface Aspect {
  pointA: Planet;
  pointB: Planet;
  type: AspectType;
  orb: number;
}

const ASPECTS = [
  { type: "conjunction", angle: 0, orb: 8 },
  { type: "opposition", angle: 180, orb: 8 },
  { type: "trine", angle: 120, orb: 7 },
  { type: "square", angle: 90, orb: 7 },
  { type: "sextile", angle: 60, orb: 5 },
] as const;

function normalize(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

function angleDistance(a: number, b: number): number {
  const diff = Math.abs(normalize(a) - normalize(b));
  return diff > 180 ? 360 - diff : diff;
}

export function detectAspects(chart: NatalChart): Aspect[] {
  const entries = Object.entries(chart.planets);

  const results: Aspect[] = [];

  for (let i = 0; i < entries.length; i++) {
    for (let j = i + 1; j < entries.length; j++) {
      const [keyA, pointA] = entries[i];
      const [keyB, pointB] = entries[j];

      const distance = angleDistance(
        pointA.longitude,
        pointB.longitude
      );

      for (const aspect of ASPECTS) {
        const orb = Math.abs(distance - aspect.angle);

        if (orb <= aspect.orb) {
          results.push({
            pointA: keyA as Planet,
            pointB: keyB as Planet,
            type: aspect.type,
            orb: Number(orb.toFixed(2)),
          });
        }
      }
    }
  }

  return results.sort((a, b) => a.orb - b.orb);
}
