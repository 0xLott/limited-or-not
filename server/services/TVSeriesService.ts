import { TMDB_API } from "../config";
import { TVSeries, Type } from "../models/TVSeries";
import { createNewTvSeriesEntity } from "../utils/createNewTvSeriesEntity";
import { APIError, InvalidParameterError, ObjectNotFoundError } from "../utils/errors";
import { fetchData } from "../utils/fetchData";

export class TVSeriesService {

  public async getTVSeriesById(seriesId: number): Promise<TVSeries> {
    if (typeof seriesId !== "number" || isNaN(seriesId) || seriesId < -2147483648 || seriesId > 2147483647) {
      throw new InvalidParameterError("`seriesId` must be a valid int32");
    }

    const url = `${TMDB_API.BASE_URL}/tv/${seriesId}?language=en-US`;

    try {
      const data = await fetchData(url);
      return createNewTvSeriesEntity(data);
    } catch (error: any) {
      if (error instanceof ObjectNotFoundError) {
        console.error(`TV Show with id ${seriesId} not found.`, error);
        throw error;
      } else if (error instanceof APIError) {
        console.error(`Error from TMDB API: ${error.message}`, error);
        throw error;
      } else {
        console.error(`Unexpected error: ${error.message}`, error);
        throw error;
      }
    }
  }

  public isMiniseries(series: TVSeries): Boolean {
    return series.type === Type.Miniseries;
  }
}
