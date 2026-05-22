import { Planet } from "../core";
import { BirthData, AnglePositions } from "./types";

export interface JplProxyRequest {
  birthData: BirthData;
  options?: {
    includeAngles?: boolean;
    includeSpeeds?: boolean;
    houseSystem?: "whole_sign" | "equal" | "placidus";
  };
}

export interface JplProxyPlanetPosition {
  planet: Planet;
  longitude: number;
  latitude?: number;
  distanceAu?: number;
  speedLongitude?: number;
}

export interface JplProxyResponse {
  positions: Record<Planet, JplProxyPlanetPosition>;
  angles?: AnglePositions;
  metadata: {
    provider: "jpl-horizons" | "mock" | string;
    source: string;
    calculatedAt: string;
    timezoneResolved?: string;
    julianDate?: number;
    warnings?: string[];
  };
}

export interface JplProxyErrorResponse {
  error: {
    code:
      | "INVALID_BIRTH_DATA"
      | "TIMEZONE_RESOLUTION_FAILED"
      | "EPHEMERIS_PROVIDER_FAILED"
      | "ANGLE_CALCULATION_FAILED"
      | "UNKNOWN_ERROR";
    message: string;
    details?: unknown;
  };
}

export function isJplProxyErrorResponse(
  value: unknown
): value is JplProxyErrorResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "error" in value &&
    typeof (value as JplProxyErrorResponse).error?.message === "string"
  );
}
