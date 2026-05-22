import { createNatalChartReading } from "../astrologyApi";
import { MockEphemerisProvider } from "../ephemeris/mockProvider";
import {
  ApiErrorResponse,
  CreateNatalReadingApiRequest,
  CreateNatalReadingApiResponse,
} from "./apiTypes";

export async function handleCreateNatalReading(
  request: CreateNatalReadingApiRequest
): Promise<CreateNatalReadingApiResponse> {
  try {
    validateNatalReadingRequest(request);

    // Temporary provider for backend scaffolding.
    // Replace this with the real ephemeris provider/proxy before production launch.
    const provider = new MockEphemerisProvider();
    const response = await createNatalChartReading({
      birthData: request.birthData,
      provider,
    });

    return {
      ok: true,
      data: response,
    };
  } catch (error) {
    return createApiError("CREATE_NATAL_READING_FAILED", error);
  }
}

function validateNatalReadingRequest(request: CreateNatalReadingApiRequest): void {
  if (!request?.birthData) {
    throw new Error("Missing birthData.");
  }

  const { date, time, timezone, latitude, longitude } = request.birthData;

  if (!date) throw new Error("Missing birth date.");
  if (!time) throw new Error("Missing birth time.");
  if (!timezone) throw new Error("Missing timezone.");
  if (typeof latitude !== "number") throw new Error("Missing or invalid latitude.");
  if (typeof longitude !== "number") throw new Error("Missing or invalid longitude.");
}

function createApiError(code: string, error: unknown): ApiErrorResponse {
  return {
    ok: false,
    error: {
      code,
      message: error instanceof Error ? error.message : "Unknown error.",
      details: error,
    },
  };
}
