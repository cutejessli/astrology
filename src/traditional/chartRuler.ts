import { NatalChart, Planet, ZodiacSign } from "../core";
import { getSignRuler, assessPlanetDignity, PlanetDignityAssessment } from "./rulerships";

export interface ChartRulerAssessment {
  ascendantSign: ZodiacSign;
  chartRuler: Planet;
  chartRulerSign: ZodiacSign;
  chartRulerHouse?: number;
  dignity: PlanetDignityAssessment;
  notes: string[];
}

export function assessChartRuler(chart: NatalChart, useModernRuler = true): ChartRulerAssessment | undefined {
  if (!chart.ascendant) {
    return undefined;
  }

  const ascendantSign = chart.ascendant.sign;
  const chartRuler = getSignRuler(ascendantSign, useModernRuler);
  const chartRulerPosition = chart.planets[chartRuler];

  if (!chartRulerPosition) {
    return undefined;
  }

  const dignity = assessPlanetDignity(chartRuler, chartRulerPosition.sign, useModernRuler);

  const notes = [
    `The Ascendant is in ${ascendantSign}, making ${formatPlanet(chartRuler)} the chart ruler.`,
    `${formatPlanet(chartRuler)} is placed in ${chartRulerPosition.sign}${
      chartRulerPosition.house ? ` in house ${chartRulerPosition.house}` : ""
    }, describing where the chart's guiding intelligence tends to express itself.`,
  ];

  return {
    ascendantSign,
    chartRuler,
    chartRulerSign: chartRulerPosition.sign,
    chartRulerHouse: chartRulerPosition.house,
    dignity,
    notes,
  };
}

function formatPlanet(planet: Planet): string {
  return planet.charAt(0).toUpperCase() + planet.slice(1);
}
