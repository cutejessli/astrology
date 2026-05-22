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
import {
  interpretChartDignities,
  DignityInterpretationSection,
} from "./dignitySynthesis";
import {
  interpretChartRuler,
  ChartRulerInterpretationSection,
} from "./chartRulerSynthesis";

export interface FullNatalReading {
  summary: string;
  planetSections: InterpretationSection[];
  aspectSections: AspectInterpretationSection[];
  dignitySections: DignityInterpretationSection[];
  chartRulerSection?: ChartRulerInterpretationSection;
  allSections: Array<
    | InterpretationSection
    | AspectInterpretationSection
    | DignityInterpretationSection
    | ChartRulerInterpretationSection
  >;
  metadata: {
    planetSectionCount: number;
    aspectSectionCount: number;
    dignitySectionCount: number;
    hasChartRulerSection: boolean;
    generatedBy: "astrology-interpretation-engine";
  };
}

export function createFullNatalReading(chart: NatalChart): FullNatalReading {
  const natalInterpretation: NatalInterpretation = interpretNatalChart(chart);
  const aspects = detectAspects(chart);
  const aspectSections = interpretAspects(aspects);
  const dignitySections = interpretChartDignities(chart);
  const chartRulerSection = interpretChartRuler(chart);

  const allSections = [
    ...natalInterpretation.sections,
    ...aspectSections,
    ...dignitySections,
    ...(chartRulerSection ? [chartRulerSection] : []),
  ].sort((a, b) => b.weight - a.weight);

  return {
    summary: createFullSummary(
      natalInterpretation,
      aspectSections,
      dignitySections,
      chartRulerSection
    ),
    planetSections: natalInterpretation.sections,
    aspectSections,
    dignitySections,
    chartRulerSection,
    allSections,
    metadata: {
      planetSectionCount: natalInterpretation.sections.length,
      aspectSectionCount: aspectSections.length,
      dignitySectionCount: dignitySections.length,
      hasChartRulerSection: Boolean(chartRulerSection),
      generatedBy: "astrology-interpretation-engine",
    },
  };
}

function createFullSummary(
  natalInterpretation: NatalInterpretation,
  aspectSections: AspectInterpretationSection[],
  dignitySections: DignityInterpretationSection[],
  chartRulerSection?: ChartRulerInterpretationSection
): string {
  const aspectSummary =
    aspectSections.length > 0
      ? ` This chart also contains ${aspectSections.length} major aspect pattern${
          aspectSections.length === 1 ? "" : "s"
        }, showing how the different parts of the psyche interact, challenge, support, and refine one another.`
      : " No major aspects are currently included in this reading, so the interpretation focuses on the personal planet placements.";

  const dignitySummary =
    dignitySections.length > 0
      ? ` It also includes ${dignitySections.length} planetary condition note${
          dignitySections.length === 1 ? "" : "s"
        }, adding nuance around where a planet expresses with ease, tension, refinement, or deeper integration.`
      : "";

  const chartRulerSummary = chartRulerSection
    ? ` The chart ruler section highlights the guiding planet of the chart, showing how the Ascendant's ruler shapes the way the whole pattern moves through life.`
    : "";

  return `${natalInterpretation.summary}${aspectSummary}${dignitySummary}${chartRulerSummary} Together, these sections are not a fixed fate, but a symbolic mirror for self-understanding, healing, and conscious choice.`;
}
