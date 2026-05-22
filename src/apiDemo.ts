import { createNatalChartReading } from "./astrologyApi";
import { MockEphemerisProvider } from "./ephemeris/mockProvider";

const provider = new MockEphemerisProvider();

const response = await createNatalChartReading({
  birthData: {
    date: "1990-10-31",
    time: "13:45",
    timezone: "America/New_York",
    latitude: 40.7128,
    longitude: -74.006,
  },
  provider,
});

console.log("Natal Chart API Response", JSON.stringify(response, null, 2));
