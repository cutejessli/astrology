// ============================================================
// Full Natal Reading Generator
// ============================================================

import { NatalChart } from "../core";
import { detectAspects } from "../aspects";
import {
  interpretNatalChart,
  InterpretationSection,
  NatalInterpretation,
} from "./synthesis";
import {
  interpretAspects,
  AspectInterpretationSection,
} from "./aspectSynthesis";

export interface FullNatalReading {
  summary: string;
  planetSections: InterpretationSection[];
  aspectSections: AspectInterpretationSection[];
  allSections: Array<InterpretationSection | AspectInterpretationSection>;
  metadata: {
    planetSectionCount: number;
    aspectSectionCount: number;
    generatedBy: "astrology-interpretation-engine";
  };
}

export function createFullNatalReading(chart: NatalChart): FullNatalReading {
  const natalInterpretation: NatalInterpretation = interpretNatalChart(chart);
  const aspects = detectAspects(chart);
  const aspectSections = interpretAspects(aspects);

  const allSections = [
    ...natalInterpretation.sections,
    ...aspectSections,
  ].sort((a, b) => b.weight - a.weight);

  return {
    summary: createFullSummary(natalInterpretation, aspectSections),
    planetSections: natalInterpretation.sections,
    aspectSections,
    allSections,
    metadata: {
      planetSectionCount: natalInterpretation.sections.length,
      aspectSectionCount: aspectSections.length,
      generatedBy: "astrology-interpretation-engine",
    },
  };
}

function createFullSummary(
  natalInterpretation: NatalInterpretation,
  aspectSections: AspectInterpretationSection[]
): string {
  const aspectSummary =
    aspectSections.length > 0
      ? ` This chart also contains ${aspectSections.length} major aspect pattern${
          aspectSections.length === 1 ? "" : "s"
        }, showing how the different parts of the psyche interact, challenge, support, and refine one another.`
      : " No major aspects are currently included in this reading, so the interpretation focuses on the personal planet placements.";

  return `${natalInterpretation.summary}${aspectSummary} Together, these sections are not a fixed fate, but a symbolic mirror for self-understanding, healing, and conscious choice.`;
}
