import {
  createChart,
  createPlanetPosition,
  getDegree,
  getSign,
  getWholeSignHouse,
  normalize,
  SIGNS,
} from "./core";
import type {
  HouseCusp,
  HouseNumber,
  NatalChart,
  Planet,
  PlanetPosition,
  ZodiacSign,
} from "./core";
import { createNodeAxis } from "./nodeAxis";
import type { LunarNode, NodeAxis } from "./nodeAxis";
import { detectAspects } from "./aspects";
import { buildNatalChart } from "./chartBuilder";
import { createNatalChartReading } from "./astrologyApi";
import { createFullNatalReading } from "./interpretation/fullNatalReading";
import { handleCreateNatalReading } from "./backend/createNatalReadingHandler";
import { handleHealthCheck } from "./backend/health";
import { healthVercelHandler, natalReadingVercelHandler } from "./backend/vercelAdapter";

export {
  SIGNS,
  buildNatalChart,
  createChart,
  createFullNatalReading,
  createNatalChartReading,
  createNodeAxis,
  createPlanetPosition,
  detectAspects,
  getDegree,
  getSign,
  getWholeSignHouse,
  handleCreateNatalReading,
  handleHealthCheck,
  healthVercelHandler,
  natalReadingVercelHandler,
  normalize,
};

export type {
  HouseCusp,
  HouseNumber,
  LunarNode,
  NatalChart,
  NodeAxis,
  Planet,
  PlanetPosition,
  ZodiacSign,
};

export {
  MERCURY_RETROGRADE_HOUSE_READINGS,
  getMercuryRetrogradeHouseReading,
} from "./retrogrades/mercuryHouseReadings";
export {
  RETROGRADE_CATALOG,
  getRetrogradeEvent,
} from "./retrogrades/retrogradeCatalog";
export type { RetrogradeEventId } from "./retrogrades/retrogradeCatalog";
export { resolveRetrogradeReading } from "./retrogrades/resolveRetrogradeReading";
export { getSolarHouse, isZodiacSign } from "./retrogrades/solarHouse";
export type {
  CollectiveRetrogradeReading,
  PersonalizedRetrogradeReading,
  ResolvedRetrogradeReading,
  RetrogradeEvent,
  RetrogradePlanet,
  RetrogradeSunSignReading,
} from "./retrogrades/types";
