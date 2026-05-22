import { HouseCusp, HouseNumber, NatalChart, Planet, ZodiacSign } from "../core";
import { getSignRuler, assessPlanetDignity, PlanetDignityAssessment } from "./rulerships";

export interface HouseRulerAssessment {
  house: HouseNumber;
  houseSign: ZodiacSign;
  ruler: Planet;
  rulerSign: ZodiacSign;
  rulerHouse?: HouseNumber;
  dignity: PlanetDignityAssessment;
  notes: string[];
}

export function assessHouseRulers(
  chart: NatalChart,
  useModernRuler = true
): HouseRulerAssessment[] {
  if (!chart.houses) {
    return [];
  }

  return chart.houses
    .slice()
    .sort((a, b) => a.house - b.house)
    .map((houseCusp) => assessHouseRuler(chart, houseCusp, useModernRuler))
    .filter((assessment): assessment is HouseRulerAssessment => assessment !== undefined);
}

export function assessHouseRuler(
  chart: NatalChart,
  houseCusp: HouseCusp,
  useModernRuler = true
): HouseRulerAssessment | undefined {
  const ruler = getSignRuler(houseCusp.sign, useModernRuler);
  const rulerPosition = chart.planets[ruler];

  if (!rulerPosition) {
    return undefined;
  }

  const dignity = assessPlanetDignity(ruler, rulerPosition.sign, useModernRuler);

  const notes = [
    `House ${houseCusp.house} begins in ${houseCusp.sign}, making ${formatPlanet(ruler)} its ruler.`,
    `${formatPlanet(ruler)} is placed in ${rulerPosition.sign}${
      rulerPosition.house ? ` in house ${rulerPosition.house}` : ""
    }, linking the topics of house ${houseCusp.house} to the life arena of house ${
      rulerPosition.house ?? "unknown"
    }.`
  ];

  return {
    house: houseCusp.house,
    houseSign: houseCusp.sign,
    ruler,
    rulerSign: rulerPosition.sign,
    rulerHouse: rulerPosition.house,
    dignity,
    notes,
  };
}

function formatPlanet(planet: Planet): string {
  return planet.charAt(0).toUpperCase() + planet.slice(1);
}
