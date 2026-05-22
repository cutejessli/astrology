import { createChart, NatalChart, Planet } from "./core";
import { BirthData, EphemerisProvider, EphemerisResult } from "./ephemeris/types";

export interface BuiltChart {
  chart: NatalChart;
  ephemeris: EphemerisResult["metadata"];
}

export async function buildNatalChart(
  birthData: BirthData,
  provider: EphemerisProvider
): Promise<BuiltChart> {
  const result = await provider.getNatalPositions(birthData);

  const longitudes = Object.fromEntries(
    Object.entries(result.positions).map(([planet, position]) => [planet, position.longitude])
  ) as Record<Planet, number>;

  const chart = createChart(longitudes, {
    ascendant: result.angles?.ascendant,
    midheaven: result.angles?.midheaven,
  });

  for (const planet of Object.keys(chart.planets) as Planet[]) {
    chart.planets[planet].retrograde = result.positions[planet].retrograde;
  }

  return {
    chart,
    ephemeris: result.metadata,
  };
}
