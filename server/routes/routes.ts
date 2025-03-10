import type { BunRequest } from "bun";
import { TVSeriesController } from "../controllers/TVSeriesController";

const tvSeriesController: TVSeriesController = new TVSeriesController();

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

  "/search/:title": async (req) => {
    const { title } = req.params as { title: string };
    return await tvSeriesController.searchTVSeriesByTitle(title);
  },
};
