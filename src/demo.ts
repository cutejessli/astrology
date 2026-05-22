import { createChart } from "./core";
import { detectAspects } from "./aspects";
import { createFullNatalReading } from "./interpretation/fullNatalReading";

const demoChart = createChart(
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
    // Demo ascendant/midheaven/node/Chiron values.
    // In production these will come from the astronomical calculation engine.
    ascendant: 14.2,
    midheaven: 284.6,
    northNode: 193.5,
    chiron: 105.2,
  }
);

const aspects = detectAspects(demoChart);
const reading = createFullNatalReading(demoChart);

console.log("Demo Chart", JSON.stringify(demoChart, null, 2));
console.log("Detected Aspects", JSON.stringify(aspects, null, 2));
console.log("Full Natal Reading", JSON.stringify(reading, null, 2));
