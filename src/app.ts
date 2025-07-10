import { createServer } from "http";
import { envs } from "./config/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";
import { WssService } from "./presentation/services/websocket.service";

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

  /*const httpServer = createServer(server.app);
  WssService.initWebsocketServer({ server: httpServer });

  console.log("🎆 [APP] Starting server...");
  httpServer.listen(envs.appPort, () => {
    console.log(`✅ [APP] Server is running on port ${envs.appPort}`);
  });*/
  server.start();
}
