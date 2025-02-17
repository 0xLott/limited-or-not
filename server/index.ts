import { fetchTVSeries } from "./models/tvSeriesModel";

const server = Bun.serve({
  async fetch(req) {
    const path = new URL(req.url).pathname;

    if (path === "/") {
      const tvSeriesData = await fetchTVSeries("2");
      return new Response(JSON.stringify(tvSeriesData), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response("Page not found", { status: 404 });
  },
});

console.log(`Listening on ${server.url}`);
