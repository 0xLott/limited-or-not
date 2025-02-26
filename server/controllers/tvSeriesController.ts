import type { BunRequest } from "bun";
import { TVSeriesService } from "../services/tvSeriesService";
import { APIError, InvalidParameterError, ObjectNotFoundError } from "../utils/errors";

const tvSeriesService = new TVSeriesService();

export const getTVSeriesById = async (req: BunRequest) => {
  try {
    const seriesId = parseInt(req.params.id);
    const series = await tvSeriesService.getTVSeriesById(seriesId);
    return new Response(JSON.stringify(series), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return handleErrorResponse(error);
  }
};

export const searchTVSeriesByTitle = async (req: BunRequest) => {
  try {
    const title = req.params.title;
    const series = await tvSeriesService.searchTVSeriesByTitle(title);
    return new Response(JSON.stringify(series), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return handleErrorResponse(error);
  }
};

const handleErrorResponse = (error: unknown) => {
  let status;
  let message;

  if (error instanceof InvalidParameterError) {
    status = 400; // Bad Request
    message = error.message;
  } else if (error instanceof ObjectNotFoundError) {
    status = 404; // Not Found
    message = error.message;
  } else if (error instanceof APIError) {
    status = 502; // Bad Gateway
    message = error.message;
  } else {
    status = 500; // Internal Server Error
    message = "Internal Server Error";
  }

  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
};
