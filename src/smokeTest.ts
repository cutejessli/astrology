import { createChart } from "./core";
import { detectAspects } from "./aspects";
import { createFullNatalReading } from "./interpretation/fullNatalReading";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`Smoke test failed: ${message}`);
  }
}

const chart = createChart(
  {
    sun: 218.4,
    moon: 42.7,
    mercury: 203.1,
    venus: 334.8,
    mars: 126.2,
    jupiter: 18.5,
    saturn: 271.3,
    uranus: 58.9,
    neptune: 299.4,
    pluto: 246.6,
  },
  {
    ascendant: 14.2,
    midheaven: 284.6,
  }
);

const aspects = detectAspects(chart);
const reading = createFullNatalReading(chart);

assert(chart.planets.sun.sign === "Scorpio", "Sun should resolve to Scorpio");
assert(chart.planets.moon.sign === "Taurus", "Moon should resolve to Taurus");
assert(chart.houses?.length === 12, "Chart should include 12 whole-sign houses");
assert(chart.ascendant?.sign === "Aries", "Ascendant should resolve to Aries");
assert(chart.planets.sun.house === 8, "Sun should resolve to the 8th house with this demo ascendant");
assert(Array.isArray(aspects), "Aspects should be an array");
assert(typeof reading.summary === "string", "Reading summary should be a string");
assert(reading.summary.length > 0, "Reading summary should not be empty");
assert(reading.planetSections.length > 0, "Reading should include planet sections");
assert(reading.dignitySections.length > 0, "Reading should include dignity sections");
assert(reading.metadata.dignitySectionCount === reading.dignitySections.length, "Dignity metadata count should match dignity sections");
assert(reading.chartRulerSection !== undefined, "Reading should include a chart ruler section");
assert(reading.metadata.hasChartRulerSection === true, "Chart ruler metadata should be true");
assert(reading.chartRulerSection?.title.includes("Mars in Leo"), "Aries rising should make Mars the chart ruler in this demo chart");
assert(reading.houseRulerSections.length > 0, "Reading should include house ruler sections");
assert(reading.metadata.houseRulerSectionCount === reading.houseRulerSections.length, "House ruler metadata count should match house ruler sections");
assert(reading.dispositorSection !== undefined, "Reading should include a dispositor section");
assert(reading.metadata.hasDispositorSection === true, "Dispositor metadata should be true");
assert(reading.dispositorSection?.chains.length > 0, "Dispositor section should include chains");
assert(
  reading.houseRulerSections.some((section) => section.title.includes("House 1 Ruler")),
  "Reading should include 1st house ruler section"
);
assert(
  reading.planetSections.some((section) => section.title.includes("Transformation and Intimacy")),
  "Reading should include house-aware section titles"
);
assert(
  reading.dignitySections.some((section) => section.title.includes("Venus in Pisces")),
  "Reading should include Venus in Pisces dignity section"
);

console.log("Smoke test passed.");
console.log(`Detected ${aspects.length} aspects.`);
console.log(`Generated ${reading.allSections.length} interpretation sections.`);
console.log(`Generated ${reading.dignitySections.length} dignity sections.`);
console.log(`Generated ${reading.houseRulerSections.length} house ruler sections.`);
console.log(`Chart ruler: ${reading.chartRulerSection?.title}`);
console.log(`Dispositor pattern: ${reading.dispositorSection?.title}`);
