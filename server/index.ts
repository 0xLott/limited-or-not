import { routes } from "./routes/routes";

const server = Bun.serve({
  port: 3000,
  routes,
  fetch: (req) => new Response("Not found", { status: 404 }),
});

console.log(`Server running: ${server.url}`);
