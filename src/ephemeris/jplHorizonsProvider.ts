import { Planet } from "../core";
import {
  BirthData,
  EphemerisProvider,
  EphemerisResult,
  EphemerisPosition,
} from "./types";

export interface JplHorizonsProviderOptions {
  /**
   * Base URL for a backend proxy that talks to JPL Horizons.
   *
   * This should point to our own backend, not directly to NASA from the mobile app.
   * Keeping this behind our backend lets us normalize results, cache responses,
   * protect app stability, and swap providers later if needed.
   */
  endpointUrl: string;
}

export interface JplHorizonsResponse {
  positions: Record<Planet, {
    longitude: number;
    latitude?: number;
    distanceAu?: number;
    speedLongitude?: number;
  }>;
  angles?: {
    ascendant?: number;
    midheaven?: number;
  };
  source?: string;
}

/**
 * JPL Horizons adapter boundary.
 *
 * This provider expects a backend proxy endpoint that accepts BirthData and returns
 * normalized ecliptic longitudes for the planets used by this library.
 *
 * It intentionally does not hard-code JPL response parsing here. The mobile app
 * and interpretation engine should consume clean astrology-ready data, while the
 * backend handles astronomical provider quirks, caching, retries, and validation.
 */
export class JplHorizonsProvider implements EphemerisProvider {
  name = "jpl-horizons-provider";

  constructor(private readonly options: JplHorizonsProviderOptions) {}

  async getNatalPositions(birthData: BirthData): Promise<EphemerisResult> {
    const response = await fetch(this.options.endpointUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ birthData }),
    });

    if (!response.ok) {
      throw new Error(
        `JPL Horizons provider request failed: ${response.status} ${response.statusText}`
      );
    }

    const data = (await response.json()) as JplHorizonsResponse;

    const positions = Object.fromEntries(
      Object.entries(data.positions).map(([planet, position]) => {
        const ephemerisPosition: EphemerisPosition = {
          planet: planet as Planet,
          longitude: position.longitude,
          latitude: position.latitude,
          distanceAu: position.distanceAu,
          speedLongitude: position.speedLongitude,
          retrograde:
            typeof position.speedLongitude === "number"
              ? position.speedLongitude < 0
              : undefined,
        };

        return [planet, ephemerisPosition];
      })
    ) as Record<Planet, EphemerisPosition>;

    return {
      positions,
      angles: data.angles,
      metadata: {
        provider: this.name,
        calculatedAt: new Date().toISOString(),
        source: data.source ?? "JPL Horizons via backend proxy",
      },
    };
  }
}
