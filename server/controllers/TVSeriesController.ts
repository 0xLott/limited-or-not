import { TVSeriesService } from "../services/TVSeriesService";
import { APIError, InvalidParameterError, ObjectNotFoundError } from "../utils/errors";
import { Get, Path, Route, Response as ApiResponse } from "tsoa";

const service = new TVSeriesService();

@Route("series")
export class TVSeriesController {

  @Get("{seriesId}")
  @ApiResponse<Error>(400, "Bad Request")
  @ApiResponse<Error>(404, "Not Found")
  public async getTVSeriesById(@Path() seriesId: number): Promise<Response> {
    try {
      const series = await service.getTVSeriesById(seriesId);
      return new Response(JSON.stringify(series), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }

  @Get("search/{title}")
  @ApiResponse<Error>(400, "Bad Request")
  @ApiResponse<Error>(404, "Not Found")
  public async searchTVSeriesByTitle(@Path() title: string): Promise<Response> {
    try {
      const series = await service.searchTVSeriesByTitle(title);
      return new Response(JSON.stringify(series), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }

  @Get("{seriesId}/is-miniseries")
  @ApiResponse<Error>(400, "Bad Request")
  @ApiResponse<Error>(404, "Not Found")
  public async isMiniseries(@Path() seriesId: number): Promise<Response> {
    try {
      const series = await service.getTVSeriesById(seriesId);
      return new Response(JSON.stringify(series.isMiniseries), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      return this.handleErrorResponse(error);
    }
  }

  handleErrorResponse = (error: any) => {
    let status;
    let message;

    if (error instanceof InvalidParameterError) {
      status = 400;
      message = error.message;
    } else if (error instanceof ObjectNotFoundError) {
      status = 404;
      message = error.message;
    } else if (error instanceof APIError) {
      status = 502;
      message = error.message;
    } else {
      status = 500;
      message = "Internal Server Error";
    }

    return new Response(JSON.stringify({ error: message }), {
      status,
      headers: { "Content-Type": "application/json" },
    });
  };
}
