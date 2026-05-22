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
  const parts = [input.natalSummary];

  if (input.aspectCount > 0) parts.push(`This chart includes ${input.aspectCount} major aspect pattern${input.aspectCount === 1 ? "" : "s"}.`);
  if (input.dignityCount > 0) parts.push(`It includes ${input.dignityCount} planetary condition note${input.dignityCount === 1 ? "" : "s"}.`);
  if (input.hasNodeAxis) parts.push("The nodal axis section highlights the soul-growth direction and the familiar karmic pattern being integrated.");
  if (input.hasChiron) parts.push("The Chiron section describes the sacred wound, healing path, and medicine carried by lived experience.");
  if (input.hasLilith) parts.push("The Black Moon Lilith section describes exiled instinct, sovereignty, taboo truth, and reclamation.");
  if (input.hasChartRuler) parts.push("The chart ruler section highlights the guiding planet of the chart.");
  if (input.houseRulerCount > 0) parts.push("House ruler sections show how major life domains route into one another.");
  if (input.hasDispositor) parts.push("The dispositor section traces the deeper rulership chain of the chart.");
  if (input.decanCount > 0) parts.push("Decan sections add degree-level nuance beneath each personal planet's sign placement.");
  if (input.boundCount > 0) parts.push("Bound sections add another degree-level stewardship layer for exact placements.");

  parts.push("Together, these sections are a symbolic mirror for self-understanding, healing, and conscious choice.");

  return parts.join(" ");
}
