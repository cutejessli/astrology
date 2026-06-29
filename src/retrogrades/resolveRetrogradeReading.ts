import type { ZodiacSign } from "../core";
import { getMercuryRetrogradeHouseReading } from "./mercuryHouseReadings";
import { getRetrogradeEvent } from "./retrogradeCatalog";
import { getSolarHouse, isZodiacSign } from "./solarHouse";
import type { ResolvedRetrogradeReading } from "./types";

export function resolveRetrogradeReading(
  retrogradeId: string,
  sunSign?: ZodiacSign | string | null
): ResolvedRetrogradeReading {
  const event = getRetrogradeEvent(retrogradeId);

  if (!event) {
    throw new Error(`Unknown retrograde event: ${retrogradeId}`);
  }

  if (!isZodiacSign(sunSign)) {
    return {
      event,
      sunSign: null,
      solarHouse: null,
      interpretation: null,
      profilePrompt: "Add your birth date to see how this retrograde affects your Sun sign.",
    };
  }

  const solarHouse = getSolarHouse(sunSign, event.sign);

  if (event.planet !== "Mercury") {
    throw new Error(
      `No Sun-sign interpretation library is available for ${event.planet} retrograde yet.`
    );
  }

  return {
    event,
    sunSign,
    solarHouse,
    interpretation: getMercuryRetrogradeHouseReading(solarHouse),
  };
}
