import type { BunRequest } from "bun";
import { TVSeriesController } from "../controllers/TVSeriesController";
import { SearchController } from "../controllers/SearchController";

const tvSeriesController: TVSeriesController = new TVSeriesController();
const searchController: SearchController = new SearchController();

export const routes: Record<string, (req: BunRequest) => Response | Promise<Response>> = {
  "/": () => Response.json({ message: "Limited or Not?" }),
  "/status": () => new Response("OK"),

  "/series/:id": async (req) => {
    const { id } = req.params as { id: string };
    const seriesId = parseInt(id);
    return await tvSeriesController.getTVSeriesById(seriesId);
  },

  "/series/:id/is-miniseries": async (req) => {
    const { id } = req.params as { id: string };
    const seriesId = parseInt(id);
    return await tvSeriesController.isMiniseries(seriesId);
  },

  "/series/search/:title": async (req) => {
    const { title } = req.params as { title: string };
    return await tvSeriesController.searchTVSeriesByTitle(title);
  },

  "/search/:query": async (req) => {
    const { query } = req.params as { query: string };
    return await searchController.getSearchResults(query);
  }
};
