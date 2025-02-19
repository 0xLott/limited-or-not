import { TVSeries, Status } from "../models/tvSeries";
import { fetchData } from "../utils/fetchData";
import { TMDB_API } from "../config";

export class TVSeriesService {
  public async getTVSeriesById(seriesId: number): Promise<TVSeries> {
    const url = `${TMDB_API.BASE_URL}/tv/${seriesId}?language=en-US`;
    const data = await fetchData(url);

    return TVSeriesService.createNewTVSeries(data);
  }

  public async searchTVSeriesByTitle(seriesTitle: string): Promise<TVSeries[]> {
    const url = `${TMDB_API.BASE_URL}/search/tv?query=${seriesTitle}&include_adult=true&language=en-US&page=1`;
    const data = await fetchData(url);

    return data.results.map((item: any) => TVSeriesService.createNewTVSeries(item));
  }

  public static createNewTVSeries(data: any): TVSeries {
    return new TVSeries(data.id, data.name, data.type, data.status as Status, data.poster_path);
  }
}
