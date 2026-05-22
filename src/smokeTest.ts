import { createChart } from "./core";
import { detectAspects } from "./aspects";
import { createFullNatalReading } from "./interpretation/fullNatalReading";

function assert(condition: boolean, message: string): void {
  if (!condition) {
    throw new Error(`Smoke test failed: ${message}`);
  }
}

const chart = createChart({
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
});

const aspects = detectAspects(chart);
const reading = createFullNatalReading(chart);

assert(chart.planets.sun.sign === "Scorpio", "Sun should resolve to Scorpio");
assert(chart.planets.moon.sign === "Taurus", "Moon should resolve to Taurus");
assert(Array.isArray(aspects), "Aspects should be an array");
assert(typeof reading.summary === "string", "Reading summary should be a string");
assert(reading.summary.length > 0, "Reading summary should not be empty");
assert(reading.planetSections.length > 0, "Reading should include planet sections");

console.log("Smoke test passed.");
console.log(`Detected ${aspects.length} aspects.`);
console.log(`Generated ${reading.allSections.length} interpretation sections.`);
