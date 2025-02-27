import type { BunRequest } from "bun";
import { getTVSeriesById, isMiniseries, searchTVSeriesByTitle } from "../controllers/tvSeriesController";

export const routes: Record<string, (req: BunRequest) => Response | Promise<Response>> = {
  "/": () => Response.json({ message: "Limited or Not?" }),
  "/api/status": () => new Response("OK"),
  "/api/series/:id": (req) => getTVSeriesById(req),
  "/api/series/:id/is-miniseries": (req) => isMiniseries(req),
  "/api/search/:title": (req) => searchTVSeriesByTitle(req),
};
