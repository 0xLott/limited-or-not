import { TVSeriesService } from "../services/TVSeriesService";
import { APIError, InvalidParameterError, ObjectNotFoundError } from "../utils/errors";
import { Get, Path, Route, Response as ApiResponse } from "tsoa";
import { handleErrorResponse } from "../utils/handleErrors";

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
      return handleErrorResponse(error);
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
      return handleErrorResponse(error);
    }
  }
}
