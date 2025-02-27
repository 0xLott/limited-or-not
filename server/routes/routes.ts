import type { BunRequest } from "bun";
import { getTVSeriesById, isMiniseries, searchTVSeriesByTitle } from "../controllers/tvSeriesController";

export const routes: Record<string, (req: BunRequest) => Response | Promise<Response>> = {
  "/": () => Response.json({ message: "Limited or Not?" }),
  "/api/status": () => new Response("OK"),
  "/series/:id": (req) => getTVSeriesById(req),
  "/series/miniseries/:id": (req) => isMiniseries(req),
  "/search/:title": (req) => searchTVSeriesByTitle(req),
};
