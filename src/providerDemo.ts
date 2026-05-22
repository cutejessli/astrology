import { buildNatalChart } from "./chartBuilder";
import { MockEphemerisProvider } from "./ephemeris/mockProvider";
import { createFullNatalReading } from "./interpretation/fullNatalReading";

const provider = new MockEphemerisProvider();

const birthData = {
  date: "1990-10-31",
  time: "13:45",
  timezone: "America/New_York",
  latitude: 40.7128,
  longitude: -74.006,
};

const built = await buildNatalChart(birthData, provider);
const reading = createFullNatalReading(built.chart);

console.log("Ephemeris Metadata", JSON.stringify(built.ephemeris, null, 2));
console.log("Built Natal Chart", JSON.stringify(built.chart, null, 2));
console.log("Full Reading", JSON.stringify(reading, null, 2));
