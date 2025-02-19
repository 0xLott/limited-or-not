import { TVSeries, Status } from "../models/tvSeries";
import { fetchData } from "../utils/fetchData";
import { TMDB_API } from "../config";
import { APIError, TVShowNotFoundError, InvalidParameterError } from "../utils/errors";

// TODO: Create a simple backlog of iteration 1 for MVP considering the to-dos below and other product functionalities
// TODO: Alternative for when there's no poster image
export class TVSeriesService {
  public async getTVSeriesById(seriesId: number): Promise<TVSeries | null> {
    if (typeof seriesId !== "number" || isNaN(seriesId) || seriesId < -2147483648 || seriesId > 2147483647) {
      throw new InvalidParameterError("seriesId must be a valid int32");
    }

    const url = `${TMDB_API.BASE_URL}/tv/${seriesId}?language=en-US`;

    try {
      const data = await fetchData(url);
      return TVSeriesService.newTvSeriesEntity(data);
    } catch (error: any) {
      if (error instanceof TVShowNotFoundError) {
        console.error(`TV Show with id ${seriesId} not found.`, error);
        return null;
      }
      if (error instanceof APIError) {
        console.error(`Error from TMDB API: ${error.message}`, error);
        throw error;
      }
      console.error(`Unexpected error: ${error.message}`, error);
      throw error;
    }
  }

  public async searchTVSeriesByTitle(seriesTitle: string): Promise<TVSeries[]> {
    const url = `${TMDB_API.BASE_URL}/search/tv?query=${seriesTitle}&include_adult=true&language=en-US&page=1`;

    try {
      const data = await fetchData(url);

      if (!data.results || data.results.length === 0) {
        throw new TVShowNotFoundError(`TV Show with title ${seriesTitle} not found.`);
      }

      return data.results.map((item: any) => TVSeriesService.newTvSeriesEntity(item));
    } catch (error: any) {
      if (error instanceof TVShowNotFoundError) {
        console.error(`TV Show with title ${seriesTitle} not found.`, error);
        return [];
      }
      if (error instanceof APIError) {
        console.error(`Error from TMDB API: ${error.message}`, error);
        throw error;
      }
      console.error(`Unexpected error: ${error.message}`, error);
      throw error;
    }
  }

  public static newTvSeriesEntity(data: any): TVSeries {
    return new TVSeries(data.id, data.name, data.type, data.status as Status, data.poster_path);
  }
}
