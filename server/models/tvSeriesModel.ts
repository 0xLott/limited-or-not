// server/models/tvSeriesModel.js
import { fetchData } from "../utils/fetchData.js";
import { TMDB_API } from "../config.js";

export async function fetchTVSeries(seriesId: string) {
  const url = `${TMDB_API.BASE_URL}/tv/${seriesId}?language=en-US`;
  const data = await fetchData(url, { accept: "application/json" });
  return data;
}
