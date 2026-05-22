import { NatalChart } from "./core";
import { detectAspects, Aspect } from "./aspects";
import { buildNatalChart, BuiltChart } from "./chartBuilder";
import { BirthData, EphemerisProvider } from "./ephemeris/types";
import {
  createFullNatalReading,
  FullNatalReading,
} from "./interpretation/fullNatalReading";

export interface NatalChartRequest {
  birthData: BirthData;
  provider: EphemerisProvider;
}

export interface NatalChartResponse {
  chart: NatalChart;
  aspects: Aspect[];
  reading: FullNatalReading;
  metadata: {
    ephemerisProvider: string;
    calculatedAt: string;
  };
}

/**
 * High-level natal chart pipeline.
 *
 * This is the main app-facing function for natal readings:
 * birth data -> ephemeris provider -> chart -> aspects -> full interpretation.
 */
export async function createNatalChartReading(
  request: NatalChartRequest
): Promise<NatalChartResponse> {
  const built: BuiltChart = await buildNatalChart(request.birthData, request.provider);
  const aspects = detectAspects(built.chart);
  const reading = createFullNatalReading(built.chart);

  return {
    chart: built.chart,
    aspects,
    reading,
    metadata: {
      ephemerisProvider: built.ephemeris.provider,
      calculatedAt: built.ephemeris.calculatedAt,
    },
  };
}
