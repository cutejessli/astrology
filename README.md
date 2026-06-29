# Astrology Engine

A proprietary TypeScript astrology calculation and interpretation engine.

This repo currently includes:

- Zodiac and planet core types
- Basic natal chart data structure
- Aspect detection
- Planet meanings
- Sign meanings
- House meanings
- Planet/sign synthesis
- Aspect synthesis
- Full natal reading generation
- Sun-sign retrograde interpretation engine
- Demo and smoke-test runners

## Install

```bash
npm install
```

## Run demo

```bash
npm run demo
```

## Typecheck

```bash
npm run typecheck
```

## Build

```bash
npm run build
```

## Retrograde readings

The initial retrograde MVP uses a solar-house model. The engine combines the user's Sun sign with the sign of the retrograde event, selects one of twelve house interpretations, and returns a structured page-ready result.

```ts
import { resolveRetrogradeReading } from "astrology";

const reading = resolveRetrogradeReading(
  "mercury-retrograde-2026-cancer",
  "Virgo"
);
```

For a Virgo Sun, Cancer resolves to the eleventh solar house, so the result focuses on friendships, community, audiences, technology, and future plans.

When the Sun sign is missing or invalid, the resolver returns the collective overview and a prompt to add the user's birth date. It never guesses a sign.

Run the retrograde smoke test with:

```bash
npm run retrograde-smoke
```

## Current architecture

```txt
src/
  core.ts
  aspects.ts
  demo.ts
  index.ts
  interpretation/
    planets.ts
    signs.ts
    houses.ts
    synthesis.ts
    aspectMeanings.ts
    aspectSynthesis.ts
    fullNatalReading.ts
  retrogrades/
    types.ts
    solarHouse.ts
    retrogradeCatalog.ts
    mercuryHouseReadings.ts
    resolveRetrogradeReading.ts
    retrogradeSmokeTest.ts
```

## Important IP note

This project should not copy copyrighted astrology books or proprietary astrology text. The interpretation system should remain original, structured, and modular.

## Next roadmap

1. Connect the retrograde resolver to the Ascension Oneness retrograde detail page.
2. Add future Mercury retrograde events to the catalog.
3. Add interpretation libraries for other retrograde planets.
4. Add full natal-chart transit aspects and timing.
5. Add an optional AI deep-reading layer after deterministic calculations are complete.
