import type { BunRequest } from "bun";
import { TVSeriesService } from "../services/tvSeriesService";

const tvSeriesService: TVSeriesService = new TVSeriesService();

export const routes = {
  "/": Response.json({ message: "Limited or Not?" }),
  "/api/status": new Response("OK"),
  "/series/:id": async (req: BunRequest) => {
    const series = await tvSeriesService.getTVSeriesById(parseInt(req.params.id));
    return new Response(JSON.stringify(series), { headers: { "Content-Type": "application/json" } });
  },
};
