# Astrology Engine API

This document describes the planned hosted API surface for the astrology engine.

The backend is currently structured around portable handlers so it can be adapted to Vercel, Render, Railway, Firebase Functions, Supabase Edge Functions, or another host.

## Health Check

```txt
GET /api/health
```

### Response

```json
{
  "status": "ok",
  "service": "astrology-engine",
  "version": "0.1.0",
  "timestamp": "2026-01-01T00:00:00.000Z"
}
```

## Create Natal Reading

```txt
POST /api/natal-reading
```

### Request Body

```json
{
  "birthData": {
    "date": "1990-10-31",
    "time": "13:45",
    "timezone": "America/New_York",
    "latitude": 40.7128,
    "longitude": -74.006
  },
  "options": {
    "includeRawChart": true,
    "includeAspects": true,
    "includeReading": true
  }
}
```

### Success Response

```json
{
  "ok": true,
  "data": {
    "chart": {},
    "aspects": [],
    "reading": {}
  }
}
```

### Error Response

```json
{
  "ok": false,
  "error": {
    "code": "CREATE_NATAL_READING_FAILED",
    "message": "Missing birthData."
  }
}
```

## Production Notes

The current backend scaffold uses `MockEphemerisProvider` so the route can be tested without a production astronomical calculation service.

Before launch, replace the mock provider with a real provider/proxy that calculates:

- planetary longitudes
- lunar nodes
- Chiron
- Black Moon Lilith
- Ascendant
- Midheaven
- house cusps
- retrogrades

The mobile app should call the hosted backend instead of calling astronomical services directly.
