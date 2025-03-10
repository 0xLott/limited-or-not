import type { BunRequest } from "bun";
import { TVSeriesService } from "../services/TVSeriesService";
import { APIError, InvalidParameterError, ObjectNotFoundError } from "../utils/errors";
import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse } from "tsoa";
const service = new TVSeriesService();

export class TVSeriesController {
  getTVSeriesById = async (seriesId: number) => {
    try {
      const series = await service.getTVSeriesById(seriesId);
      return new Response(JSON.stringify(series), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  };

  searchTVSeriesByTitle = async (title: string) => {
    try {
      const series = await service.searchTVSeriesByTitle(title);
      return new Response(JSON.stringify(series), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  };

  isMiniseries = async (seriesId: number) => {
    try {
      const series = await service.getTVSeriesById(seriesId);
      const isMiniseries = service.isMiniseries(series);
      return new Response(JSON.stringify({ isMiniseries }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  };

  handleErrorResponse = (error: unknown) => {
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
}
