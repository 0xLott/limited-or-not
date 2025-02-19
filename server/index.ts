import { TVSeriesService } from "./services/tvSeriesService";

const tvSeriesService: TVSeriesService = new TVSeriesService();

const server = Bun.serve({
  async fetch(req) {
    const path = new URL(req.url).pathname;

    if (path === "/") {
      const tvSeriesData = await tvSeriesService.searchTVSeriesByTitle("merlin");
      return new Response(JSON.stringify(tvSeriesData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Page not found", { status: 404 });
  },
});

console.log(`Listening on ${server.url}`);
