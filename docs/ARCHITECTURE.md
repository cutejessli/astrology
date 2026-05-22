# Astrology Engine Architecture

This repository is structured as a modular astrology calculation and interpretation engine.

The core design principle is separation:

```txt
astronomical data
→ chart construction
→ symbolic interpretation
→ app-facing API response
```

## Current Flow

```txt
BirthData
  ↓
EphemerisProvider
  ↓
buildNatalChart()
  ↓
NatalChart
  ↓
detectAspects()
  ↓
createFullNatalReading()
  ↓
NatalChartResponse
```

## Major Modules

### `src/core.ts`

Core astrology types and basic chart construction.

Includes:

- zodiac signs
- planets
- planet positions
- whole-sign house support
- ascendant and midheaven placeholders
- chart creation from planetary longitudes

### `src/aspects.ts`

Detects major aspects between planets.

Current aspects:

- conjunction
- opposition
- trine
- square
- sextile

### `src/ephemeris/`

Provider abstraction layer for astronomical data.

Current files:

- `types.ts` — provider interfaces
- `mockProvider.ts` — static demo provider
- `jplHorizonsProvider.ts` — adapter for future backend proxy
- `backendContract.ts` — shared request/response contract for the backend

The mobile app should not call NASA/JPL directly. A backend proxy should fetch, normalize, cache, and validate ephemeris data.

### `src/chartBuilder.ts`

Turns ephemeris provider data into a `NatalChart`.

This is the bridge between astronomical data and astrology-ready chart data.

### `src/interpretation/`

The symbolic meaning engine.

Current files:

- `planets.ts` — planetary archetypes
- `signs.ts` — zodiac sign archetypes
- `houses.ts` — life domains
- `aspectMeanings.ts` — aspect dynamics
- `synthesis.ts` — planet + sign + optional house synthesis
- `aspectSynthesis.ts` — aspect interpretation synthesis
- `fullNatalReading.ts` — combines placement and aspect interpretation into a full reading

### `src/astrologyApi.ts`

High-level app-facing API.

This is the simplest entry point for the app:

```txt
birth data + provider → chart + aspects + full reading
```

## Demo Scripts

```bash
npm run demo
npm run provider-demo
npm run api-demo
npm run smoke
npm run typecheck
npm run build
```

## Interpretation Philosophy

The system should remain:

- original
- symbolic
- psychologically nuanced
- spiritually intelligent
- non-fatalistic
- modular
- extensible

The engine should not claim fixed destiny. It should frame astrology as a symbolic mirror for self-understanding, healing, timing, and conscious choice.

## Roadmap

### Phase 1: Core Symbolic Engine

- Planet meanings
- Sign meanings
- House meanings
- Aspect meanings
- Planet/sign/house synthesis
- Aspect synthesis
- Full natal reading

### Phase 2: Calculation Accuracy

- Timezone handling
- Julian date conversion
- NASA/JPL or Swiss Ephemeris backend support
- Ascendant and Midheaven calculation
- House systems
- Retrograde motion

### Phase 3: Advanced Astrology Layers

- chart ruler
- house rulers
- dispositors
- dignities
- exaltation, detriment, fall
- decans
- bounds/terms
- nodes
- Chiron
- Lilith
- asteroids

### Phase 4: Dynamic Timing

- transits
- progressions
- solar returns
- lunar returns
- cosmic weather

### Phase 5: App Integration

- hosted backend
- mobile API endpoints
- user saved charts
- journaling/reflection prompts
- personalized synthesis
- identity transformation layer
