import { HealthCheckResponse } from "./apiTypes";

export function handleHealthCheck(version = "0.1.0"): HealthCheckResponse {
  return {
    status: "ok",
    service: "astrology-engine",
    version,
    timestamp: new Date().toISOString(),
  };
}
