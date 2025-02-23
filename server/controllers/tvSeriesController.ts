import type { BunRequest } from "bun";
import { TVSeriesService } from "../services/tvSeriesService";

const tvSeriesService = new TVSeriesService();

export const getTVSeriesById = async (req: BunRequest) => {
  const seriesId = parseInt(req.params.id);

  const series = await tvSeriesService.getTVSeriesById(seriesId);

  return new Response(JSON.stringify(series), {
    headers: { "Content-Type": "application/json" },
  });
};

export const searchTVSeriesByTitle = async (req: BunRequest) => {
  const seriesTitle = req.params.title;

  const searchResult = await tvSeriesService.searchTVSeriesByTitle(seriesTitle);

  return new Response(JSON.stringify(searchResult), {
    headers: { "Content-Type": "application/json" },
  });
};
