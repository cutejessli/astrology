import { NatalChartResponse } from "../astrologyApi";
import { BirthData } from "../ephemeris/types";

export interface ApiErrorResponse {
  ok: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface ApiSuccessResponse<T> {
  ok: true;
  data: T;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface CreateNatalReadingApiRequest {
  birthData: BirthData;
  options?: {
    includeRawChart?: boolean;
    includeAspects?: boolean;
    includeReading?: boolean;
  };
}

export type CreateNatalReadingApiResponse = ApiResponse<NatalChartResponse>;

export interface HealthCheckResponse {
  status: "ok";
  service: "astrology-engine";
  version: string;
  timestamp: string;
}
