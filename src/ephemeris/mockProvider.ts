import { Planet } from "../core";
import {
  BirthData,
  EphemerisProvider,
  EphemerisResult,
  EphemerisPosition,
} from "./types";

const demoLongitudes: Record<Planet, number> = {
  sun: 218.4,
  moon: 42.7,
  mercury: 203.1,
  venus: 334.8,
  mars: 126.2,
  jupiter: 18.5,
  saturn: 271.3,
  uranus: 58.9,
  neptune: 299.4,
  pluto: 246.6,
};

export class MockEphemerisProvider implements EphemerisProvider {
  name = "mock-ephemeris-provider";

  async getNatalPositions(_birthData: BirthData): Promise<EphemerisResult> {
    const positions = Object.fromEntries(
      Object.entries(demoLongitudes).map(([planet, longitude]) => {
        const position: EphemerisPosition = {
          planet: planet as Planet,
          longitude,
          speedLongitude: planet === "jupiter" ? -0.02 : 0.1,
          retrograde: planet === "jupiter",
        };

        return [planet, position];
      })
    ) as Record<Planet, EphemerisPosition>;

    return {
      positions,
      angles: {
        ascendant: 14.2,
        midheaven: 284.6,
      },
      metadata: {
        provider: this.name,
        calculatedAt: new Date().toISOString(),
        source: "static demo data",
      },
    };
  }
}
