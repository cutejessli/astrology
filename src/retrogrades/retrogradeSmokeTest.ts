import type { HouseNumber, ZodiacSign } from "../core";
import { MERCURY_RETROGRADE_HOUSE_READINGS } from "./mercuryHouseReadings";
import { resolveRetrogradeReading } from "./resolveRetrogradeReading";
import { getSolarHouse } from "./solarHouse";

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Retrograde smoke test failed: ${message}`);
  }
}

const cancerTransitExpectations: Array<[ZodiacSign, HouseNumber]> = [
  ["Aries", 4],
  ["Taurus", 3],
  ["Gemini", 2],
  ["Cancer", 1],
  ["Leo", 12],
  ["Virgo", 11],
  ["Libra", 10],
  ["Scorpio", 9],
  ["Sagittarius", 8],
  ["Capricorn", 7],
  ["Aquarius", 6],
  ["Pisces", 5],
];

for (const [sunSign, expectedHouse] of cancerTransitExpectations) {
  assert(
    getSolarHouse(sunSign, "Cancer") === expectedHouse,
    `${sunSign} Sun should place Cancer in solar house ${expectedHouse}`
  );
}

assert(getSolarHouse("Pisces", "Aries") === 2, "Pisces-to-Aries wraparound should resolve to house 2");
assert(getSolarHouse("Aries", "Pisces") === 12, "Aries-to-Pisces wraparound should resolve to house 12");
assert(Object.keys(MERCURY_RETROGRADE_HOUSE_READINGS).length === 12, "All twelve house readings should exist");

for (const reading of Object.values(MERCURY_RETROGRADE_HOUSE_READINGS)) {
  assert(reading.focusAreas.length === 3, `House ${reading.solarHouse} should have exactly three focus areas`);
  assert(reading.paragraphs.length >= 2, `House ${reading.solarHouse} should include at least two paragraphs`);
}

const virgoReading = resolveRetrogradeReading(
  "mercury-retrograde-2026-cancer",
  "Virgo"
);
assert(virgoReading.sunSign === "Virgo", "Virgo reading should preserve the Sun sign");
assert(virgoReading.solarHouse === 11, "Virgo reading should select solar house 11");
assert(virgoReading.interpretation?.solarHouse === 11, "Virgo reading should use the house 11 interpretation");

const missingSunSign = resolveRetrogradeReading(
  "mercury-retrograde-2026-cancer",
  null
);
assert(missingSunSign.sunSign === null, "Missing Sun sign should return the collective fallback");
assert(missingSunSign.interpretation === null, "Collective fallback should not invent a personal interpretation");
assert(missingSunSign.profilePrompt.length > 0, "Collective fallback should include a profile prompt");

console.log("Retrograde smoke test passed.");
