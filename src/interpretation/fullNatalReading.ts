import { NatalChart } from "../core";
import { detectAspects } from "../aspects";
import { interpretNatalChart, InterpretationSection } from "./synthesis";
import { interpretAspects, AspectInterpretationSection } from "./aspectSynthesis";
import { interpretChartDignities, DignityInterpretationSection } from "./dignitySynthesis";
import { interpretChartRuler, ChartRulerInterpretationSection } from "./chartRulerSynthesis";
import { interpretHouseRulers, HouseRulerInterpretationSection } from "./houseRulerSynthesis";
import { interpretDispositors, DispositorInterpretationSection } from "./dispositorSynthesis";
import { interpretChartDecans, DecanInterpretationSection } from "./decanSynthesis";
import { interpretChartBounds, BoundInterpretationSection } from "./boundSynthesis";
import { interpretNodeAxis, NodeAxisInterpretationSection } from "./nodeSynthesis";
import { interpretChiron, ChironInterpretationSection } from "./chironSynthesis";
import { interpretLilith, LilithInterpretationSection } from "./lilithSynthesis";
import { joinSentences } from "./voice";

export interface FullNatalReading {
  summary: string;
  planetSections: InterpretationSection[];
  aspectSections: AspectInterpretationSection[];
  dignitySections: DignityInterpretationSection[];
  houseRulerSections: HouseRulerInterpretationSection[];
  decanSections: DecanInterpretationSection[];
  boundSections: BoundInterpretationSection[];
  nodeAxisSection?: NodeAxisInterpretationSection;
  chironSection?: ChironInterpretationSection;
  lilithSection?: LilithInterpretationSection;
  chartRulerSection?: ChartRulerInterpretationSection;
  dispositorSection?: DispositorInterpretationSection;
  allSections: Array<
    | InterpretationSection
    | AspectInterpretationSection
    | DignityInterpretationSection
    | HouseRulerInterpretationSection
    | DecanInterpretationSection
    | BoundInterpretationSection
    | NodeAxisInterpretationSection
    | ChironInterpretationSection
    | LilithInterpretationSection
    | ChartRulerInterpretationSection
    | DispositorInterpretationSection
  >;
  metadata: {
    planetSectionCount: number;
    aspectSectionCount: number;
    dignitySectionCount: number;
    houseRulerSectionCount: number;
    decanSectionCount: number;
    boundSectionCount: number;
    hasNodeAxisSection: boolean;
    hasChironSection: boolean;
    hasLilithSection: boolean;
    hasChartRulerSection: boolean;
    hasDispositorSection: boolean;
    generatedBy: "astrology-interpretation-engine";
  };
}

export function createFullNatalReading(chart: NatalChart): FullNatalReading {
  const natal = interpretNatalChart(chart);
  const aspectSections = interpretAspects(detectAspects(chart));
  const dignitySections = interpretChartDignities(chart);
  const houseRulerSections = interpretHouseRulers(chart);
  const decanSections = interpretChartDecans(chart);
  const boundSections = interpretChartBounds(chart);
  const nodeAxisSection = chart.nodes ? interpretNodeAxis(chart.nodes) : undefined;
  const chironSection = chart.chiron ? interpretChiron(chart.chiron) : undefined;
  const lilithSection = chart.lilith ? interpretLilith(chart.lilith) : undefined;
  const chartRulerSection = interpretChartRuler(chart);
  const dispositorSection = interpretDispositors(chart);

  const allSections = [
    ...natal.sections,
    ...aspectSections,
    ...dignitySections,
    ...houseRulerSections,
    ...decanSections,
    ...boundSections,
    ...(nodeAxisSection ? [nodeAxisSection] : []),
    ...(chironSection ? [chironSection] : []),
    ...(lilithSection ? [lilithSection] : []),
    ...(chartRulerSection ? [chartRulerSection] : []),
    ...(dispositorSection ? [dispositorSection] : []),
  ].sort((a, b) => b.weight - a.weight);

  return {
    summary: createFullSummary({
      natalSummary: natal.summary,
      aspectCount: aspectSections.length,
      dignityCount: dignitySections.length,
      houseRulerCount: houseRulerSections.length,
      decanCount: decanSections.length,
      boundCount: boundSections.length,
      hasNodeAxis: Boolean(nodeAxisSection),
      hasChiron: Boolean(chironSection),
      hasLilith: Boolean(lilithSection),
      hasChartRuler: Boolean(chartRulerSection),
      hasDispositor: Boolean(dispositorSection),
    }),
    planetSections: natal.sections,
    aspectSections,
    dignitySections,
    houseRulerSections,
    decanSections,
    boundSections,
    nodeAxisSection,
    chironSection,
    lilithSection,
    chartRulerSection,
    dispositorSection,
    allSections,
    metadata: {
      planetSectionCount: natal.sections.length,
      aspectSectionCount: aspectSections.length,
      dignitySectionCount: dignitySections.length,
      houseRulerSectionCount: houseRulerSections.length,
      decanSectionCount: decanSections.length,
      boundSectionCount: boundSections.length,
      hasNodeAxisSection: Boolean(nodeAxisSection),
      hasChironSection: Boolean(chironSection),
      hasLilithSection: Boolean(lilithSection),
      hasChartRulerSection: Boolean(chartRulerSection),
      hasDispositorSection: Boolean(dispositorSection),
      generatedBy: "astrology-interpretation-engine",
    },
  };
}

function createFullSummary(input: {
  natalSummary: string;
  aspectCount: number;
  dignityCount: number;
  houseRulerCount: number;
  decanCount: number;
  boundCount: number;
  hasNodeAxis: boolean;
  hasChiron: boolean;
  hasLilith: boolean;
  hasChartRuler: boolean;
  hasDispositor: boolean;
}): string {
  return joinSentences([
    input.natalSummary,
    input.aspectCount > 0
      ? `The aspect patterns show how different parts of the chart speak to one another, creating both support and growth pressure`
      : undefined,
    input.dignityCount > 0
      ? `The planetary condition notes add nuance around where each planet feels especially supported, challenged, or intensified`
      : undefined,
    input.hasNodeAxis
      ? `The nodal axis adds the long arc of growth: familiar patterns, new practice, and the direction that wants more embodiment`
      : undefined,
    input.hasChiron
      ? `Chiron brings in the healing thread, showing where tenderness can become wisdom over time`
      : undefined,
    input.hasLilith
      ? `Black Moon Lilith brings in the reclamation thread: instinct, sovereignty, and the places where truth wants to return to the body`
      : undefined,
    input.hasChartRuler
      ? `The chart ruler acts like a guiding planet, coloring the way the whole chart organizes itself`
      : undefined,
    input.houseRulerCount > 0
      ? `The house ruler sections show how life areas feed into one another, turning the chart into a living system instead of isolated placements`
      : undefined,
    input.hasDispositor
      ? `The dispositor section follows the deeper chain of influence underneath the placements`
      : undefined,
    input.decanCount > 0
      ? `The decans add a finer degree-level texture to the personal planets`
      : undefined,
    input.boundCount > 0
      ? `The bounds add another subtle layer of stewardship around exact degrees`
      : undefined,
    `Taken together, this reading is meant to be a mirror for self-understanding, healing, and conscious choice`,
  ]);
}
