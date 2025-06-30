import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

(async () => {
  try {
    console.log("🎆 [APP] Initializing application...");
    await app();
  } catch (error) {
    console.error("❌ [APP] Failed to start application:", error);
    process.exit(1);
  }
})();

function app() {
  const routes = AppRoutes.routes;

  console.log("🎆 [APP] Creating server instance...");
  const server = new Server({
    port: envs.appPort,
    routes: routes,
  });

  console.log("🎆 [APP] Starting server...");
  server.start();
}
