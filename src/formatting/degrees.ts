import { PlanetPosition, ZodiacSign } from "../core";

export interface DegreeParts {
  degrees: number;
  minutes: number;
  seconds: number;
}

export function decimalToDegreeParts(decimalDegrees: number): DegreeParts {
  const absolute = Math.abs(decimalDegrees);
  const degrees = Math.floor(absolute);
  const minutesFloat = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesFloat);
  const seconds = Math.round((minutesFloat - minutes) * 60);

  if (seconds === 60) {
    return normalizeDegreeParts({ degrees, minutes: minutes + 1, seconds: 0 });
  }

  return normalizeDegreeParts({ degrees, minutes, seconds });
}

export function formatDegreeParts(parts: DegreeParts): string {
  return `${parts.degrees}°${parts.minutes.toString().padStart(2, "0")}'${parts.seconds
    .toString()
    .padStart(2, "0")}\"`;
}

export function formatSignPosition(sign: ZodiacSign, degreeInSign: number): string {
  return `${formatDegreeParts(decimalToDegreeParts(degreeInSign))} ${sign}`;
}

export function formatPlanetPosition(position: PlanetPosition): string {
  return formatSignPosition(position.sign, position.degree);
}

function normalizeDegreeParts(parts: DegreeParts): DegreeParts {
  let { degrees, minutes, seconds } = parts;

  if (seconds >= 60) {
    minutes += Math.floor(seconds / 60);
    seconds = seconds % 60;
  }

  if (minutes >= 60) {
    degrees += Math.floor(minutes / 60);
    minutes = minutes % 60;
  }

  return { degrees, minutes, seconds };
}
