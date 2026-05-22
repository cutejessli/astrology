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
- Demo runner

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
```

## Important IP note

This project should not copy copyrighted astrology books or proprietary astrology text. The interpretation system should remain original, structured, and modular.

## Next roadmap

1. Add tests.
2. Add house-aware chart model.
3. Add Ascendant and Midheaven support.
4. Add NASA/JPL ephemeris adapter interface.
5. Add transit chart support.
6. Add API wrapper for use in the mobile app.
