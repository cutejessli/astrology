export type InterpretationTone = "warm" | "direct" | "spiritual";

export interface VoiceLineInput {
  opening: string;
  meaning: string;
  growth?: string;
  caution?: string;
  integration?: string;
}

export function createHumanInterpretation(input: VoiceLineInput): string {
  return joinSentences([
    softenOpening(input.opening),
    input.meaning,
    input.growth ? `The growth here is ${lowerFirst(input.growth)}` : undefined,
    input.caution ? `Watch for ${lowerFirst(input.caution)}` : undefined,
    input.integration ? `A grounded way to work with this is ${lowerFirst(input.integration)}` : undefined,
  ]);
}

export function createPlacementOpening(label: string, theme: string): string {
  return `${label} brings attention to ${lowerFirst(theme)}.`;
}

export function createSpiritualGuidanceLine(guidance: string): string {
  return `At its best, this becomes ${lowerFirst(guidance)}`;
}

export function softenOpening(value: string): string {
  return value
    .replace(/^This placement indicates that /i, "This part of the chart points to ")
    .replace(/^This placement indicates /i, "This part of the chart points to ")
    .replace(/^This chart indicates that /i, "This chart suggests ")
    .replace(/^This chart indicates /i, "This chart suggests ")
    .replace(/^The native /i, "You ")
    .replace(/\bthe native\b/gi, "you");
}

export function joinSentences(parts: Array<string | undefined | null | false>): string {
  return parts
    .filter((part): part is string => Boolean(part && part.trim()))
    .map((part) => ensureSentence(part.trim()))
    .join(" ");
}

export function lowerFirst(value: string): string {
  if (!value) return value;
  return value.charAt(0).toLowerCase() + value.slice(1);
}

export function ensureSentence(value: string): string {
  if (!value) return value;
  return /[.!?]$/.test(value) ? value : `${value}.`;
}

export function reduceReportLanguage(value: string): string {
  return value
    .replace(/\bmay indicate\b/gi, "can show")
    .replace(/\bindicates\b/gi, "points to")
    .replace(/\bsignifies\b/gi, "speaks to")
    .replace(/\bthere is a tendency to\b/gi, "you may notice a pull to")
    .replace(/\bthe individual\b/gi, "you")
    .replace(/\bthe person\b/gi, "you")
    .replace(/\bthe native\b/gi, "you");
}
