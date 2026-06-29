import { SIGNS } from "../core";
import type { HouseNumber, ZodiacSign } from "../core";

export function isZodiacSign(value: unknown): value is ZodiacSign {
  return typeof value === "string" && SIGNS.includes(value as ZodiacSign);
}

export function getSolarHouse(
  sunSign: ZodiacSign,
  transitSign: ZodiacSign
): HouseNumber {
  const sunIndex = SIGNS.indexOf(sunSign);
  const transitIndex = SIGNS.indexOf(transitSign);

  return (((transitIndex - sunIndex + 12) % 12) + 1) as HouseNumber;
}
