import type { BunRequest } from "bun";
import { getTVSeriesById, searchTVSeriesByTitle } from "../controllers/tvSeriesController";

export const routes: Record<string, (req: BunRequest) => Response | Promise<Response>> = {
  "/": () => Response.json({ message: "Limited or Not?" }),
  "/api/status": () => new Response("OK"),
  "/series/:id": (req) => getTVSeriesById(req),
  "/search/:title": (req) => searchTVSeriesByTitle(req),
};
