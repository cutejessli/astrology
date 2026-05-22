import { NatalChart, Planet } from "../core";
import {
  assessPlanetDignity,
  EssentialDignity,
  PlanetDignityAssessment,
} from "../traditional/rulerships";

export interface DignityInterpretationSection {
  title: string;
  body: string;
  keywords: string[];
  weight: number;
  dignity: EssentialDignity;
}

export function interpretPlanetDignity(
  planet: Planet,
  assessment: PlanetDignityAssessment
): DignityInterpretationSection {
  const planetName = formatPlanet(planet);
  const signName = assessment.sign;

  return {
    title: `${planetName} in ${signName} — ${formatDignity(assessment.dignity)}`,
    body: createDignityBody(planet, assessment),
    keywords: [
      assessment.dignity,
      "rulership",
      "planetary condition",
      "integration",
      assessment.sign.toLowerCase(),
    ],
    weight: dignityWeight(assessment.dignity),
    dignity: assessment.dignity,
  };
}

export function interpretChartDignities(
  chart: NatalChart,
  planets: Planet[] = ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn"]
): DignityInterpretationSection[] {
  return planets
    .map((planet) => {
      const position = chart.planets[planet];
      const assessment = assessPlanetDignity(planet, position.sign);
      return interpretPlanetDignity(planet, assessment);
    })
    .filter((section) => section.dignity !== "peregrine")
    .sort((a, b) => b.weight - a.weight);
}

function createDignityBody(
  planet: Planet,
  assessment: PlanetDignityAssessment
): string {
  const planetName = formatPlanet(planet);
  const rulerName = formatPlanet(assessment.ruler);
  const notes = assessment.notes.join(" ");

  const base = `${planetName} is placed in ${assessment.sign}, a sign ruled by ${rulerName}. ${notes}`;

  const interpretation: Record<EssentialDignity, string> = {
    domicile:
      "This suggests the planet can speak in its own language more directly. Its gifts may be easier to recognize, but they still need maturity so strength does not become automatic habit or unconscious dominance.",
    exaltation:
      "This suggests an elevated or highly visible expression. The planet may reach toward refinement, excellence, and noble expression, though the lesson is to keep that brightness embodied and humble.",
    detriment:
      "This suggests the planet is working in unfamiliar territory. Rather than being weak, it asks for conscious translation, patience, and integration so its gifts can emerge through contrast and relational intelligence.",
    fall:
      "This suggests the planet may express through vulnerability, humility, or deep inner work. Its medicine often comes through healing old compensations and learning a more honest form of strength.",
    peregrine:
      "This planet has no major essential dignity or debility here, so its expression depends more strongly on house placement, aspects, sect, and the wider chart context.",
  };

  return `${base} ${interpretation[assessment.dignity]}`;
}

function dignityWeight(dignity: EssentialDignity): number {
  const weights: Record<EssentialDignity, number> = {
    domicile: 3.5,
    exaltation: 3.25,
    detriment: 3.0,
    fall: 3.0,
    peregrine: 1.0,
  };

  return weights[dignity];
}

function formatDignity(dignity: EssentialDignity): string {
  const labels: Record<EssentialDignity, string> = {
    domicile: "Domicile Strength",
    exaltation: "Exalted Expression",
    detriment: "Conscious Integration",
    fall: "Deep Healing Path",
    peregrine: "Neutral Condition",
  };

  return labels[dignity];
}

function formatPlanet(planet: Planet): string {
  return planet.charAt(0).toUpperCase() + planet.slice(1);
}
