import type { HouseNumber, ZodiacSign } from "../core";

export type RetrogradePlanet =
  | "Mercury"
  | "Venus"
  | "Mars"
  | "Jupiter"
  | "Saturn"
  | "Uranus"
  | "Neptune"
  | "Pluto";

export interface RetrogradeEvent {
  id: string;
  planet: RetrogradePlanet;
  sign: ZodiacSign;
  startDate: string;
  directDate: string;
  postShadowEndDate?: string;
  stationRetrogradeDegree?: number;
  stationDirectDegree?: number;
  overview: string;
}

export interface RetrogradeSunSignReading {
  solarHouse: HouseNumber;
  areaName: string;
  headline: string;
  paragraphs: string[];
  focusAreas: [string, string, string];
  practicalAction: string;
  reflectionPrompt: string;
}

export interface PersonalizedRetrogradeReading {
  event: RetrogradeEvent;
  sunSign: ZodiacSign;
  solarHouse: HouseNumber;
  interpretation: RetrogradeSunSignReading;
}

export interface CollectiveRetrogradeReading {
  event: RetrogradeEvent;
  sunSign: null;
  solarHouse: null;
  interpretation: null;
  profilePrompt: string;
}

export type ResolvedRetrogradeReading =
  | PersonalizedRetrogradeReading
  | CollectiveRetrogradeReading;
