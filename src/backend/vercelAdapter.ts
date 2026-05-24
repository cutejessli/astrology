import {
  ApiErrorResponse,
  CreateNatalReadingApiRequest,
  CreateNatalReadingApiResponse,
  HealthCheckResponse,
} from "./apiTypes";
import { handleCreateNatalReading } from "./createNatalReadingHandler";
import { handleHealthCheck } from "./health";

export interface MinimalHttpRequest {
  method?: string;
  body?: unknown;
}

export interface MinimalHttpResponse {
  status(code: number): MinimalHttpResponse;
  json(payload: unknown): void;
  setHeader?(name: string, value: string): void;
}

export async function natalReadingVercelHandler(
  req: MinimalHttpRequest,
  res: MinimalHttpResponse
): Promise<void> {
  applyCors(res);

  if (req.method === "OPTIONS") {
    res.status(204).json({});
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json(createError("METHOD_NOT_ALLOWED", "Use POST for natal readings."));
    return;
  }

  const result: CreateNatalReadingApiResponse = await handleCreateNatalReading(
    req.body as CreateNatalReadingApiRequest
  );

  res.status(result.ok ? 200 : 400).json(result);
}

export function healthVercelHandler(
  req: MinimalHttpRequest,
  res: MinimalHttpResponse
): void {
  applyCors(res);

  if (req.method === "OPTIONS") {
    res.status(204).json({});
    return;
  }

  if (req.method !== "GET") {
    res.status(405).json(createError("METHOD_NOT_ALLOWED", "Use GET for health checks."));
    return;
  }

  const result: HealthCheckResponse = handleHealthCheck();
  res.status(200).json(result);
}

function applyCors(res: MinimalHttpResponse): void {
  res.setHeader?.("Access-Control-Allow-Origin", "*");
  res.setHeader?.("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader?.("Access-Control-Allow-Headers", "Content-Type, Authorization");
}

function createError(code: string, message: string): ApiErrorResponse {
  return {
    ok: false,
    error: {
      code,
      message,
    },
  };
}
