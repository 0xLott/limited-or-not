import { TVSeries, Status } from "../models/tvSeries";
import { fetchData } from "../utils/fetchData";
import { TMDB_API } from "../config";

export class TVSeriesService {
  public async getTVSeriesById(seriesId: number): Promise<TVSeries> {
    const url = `${TMDB_API.BASE_URL}/tv/${seriesId}?language=en-US`;
    const data = await fetchData(url);
    return new TVSeries(data.id, data.name, data.status as Status);
  }

  public async searchTVSeriesByTitle(seriesTitle: string): Promise<TVSeries[]> {
    const url = `${TMDB_API.BASE_URL}/search/tv?query=${seriesTitle}&include_adult=true&language=en-US&page=1`;
    const data = await fetchData(url);

    const final = data.results.map((item: any) => new TVSeries(item.id, item.name, item.status as Status));
    console.log(
      data.results.map((item: any) => new TVSeries(item.id, item.name, item.status as Status, item.poster_path))
    );
    return data.results.map((item: any) => new TVSeries(item.id, item.name, item.status as Status, item.poster_path));
  }
}
