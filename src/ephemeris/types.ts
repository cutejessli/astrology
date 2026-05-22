import { Planet } from "../core";

export interface BirthData {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm local time
  timezone: string; // IANA timezone, e.g. America/New_York
  latitude: number;
  longitude: number;
}

export interface EphemerisPosition {
  planet: Planet;
  longitude: number;
  latitude?: number;
  distanceAu?: number;
  speedLongitude?: number;
  retrograde?: boolean;
}

export interface AnglePositions {
  ascendant?: number;
  midheaven?: number;
}

export interface EphemerisResult {
  positions: Record<Planet, EphemerisPosition>;
  angles?: AnglePositions;
  metadata: {
    provider: string;
    calculatedAt: string;
    source?: string;
  };
}

export interface EphemerisProvider {
  name: string;
  getNatalPositions(birthData: BirthData): Promise<EphemerisResult>;
}
