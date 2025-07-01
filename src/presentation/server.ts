import express, { Router } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import { connectRedis, disconnectRedis, swaggerSpec } from "../config";
import responseTime from "response-time";

interface Options {
  port: number;
  routes: Router;
}

export class Server {
  private app = express();
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port, routes } = options;
    this.port = port;
    this.routes = routes;
  }

  async start() {
    console.log("🚀 [SERVER] =========================");

    // * Conectar a Redis al iniciar el servidor
    try {
      await connectRedis();
      console.log("✅ [SERVER] Redis conectado exitosamente.");
    } catch (error) {
      console.error("❌ [SERVER] No se pudo conectar a Redis:", error);
      // Decide si quieres que la aplicación falle si Redis no se conecta.
      // Por ahora, solo logueamos el error, pero la aplicación continuará.
      // Si Redis es crítico, podrías usar `process.exit(1);` aquí.
    }

    //* Middlewares
    this.app.use(express.json());

    // Configuración de Swagger
    this.app.use(
      "/documentation",
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec)
    );

    this.app.use(cors()); // CORS

    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    this.app.use(responseTime());

    //* Routes
    this.app.use(this.routes);

    console.log("🚀 [SERVER] Starting HTTP server...");
    const httpServer = this.app.listen(this.port, () => {
      console.log(
        `✅ [SERVER] API Base URL: http://localhost:${this.port}/api`
      );
    });

    // * Manejo de cierre de la aplicación para desconectar Redis
    // Estas señales son enviadas por el sistema operativo al intentar cerrar el proceso
    process.on("SIGINT", async () => {
      console.log(
        "\n🚨 [SERVER] Recibida señal SIGINT. Iniciando cierre limpio..."
      );
      await disconnectRedis(); // Desconectar Redis
      httpServer.close(() => {
        // Cerrar el servidor HTTP
        console.log("🛑 [SERVER] Servidor HTTP cerrado.");
        process.exit(0); // Salir del proceso
      });
    });

    process.on("SIGTERM", async () => {
      console.log(
        "\n🚨 [SERVER] Recibida señal SIGTERM. Iniciando cierre limpio..."
      );
      await disconnectRedis(); // Desconectar Redis
      httpServer.close(() => {
        // Cerrar el servidor HTTP
        console.log("🛑 [SERVER] Servidor HTTP cerrado.");
        process.exit(0); // Salir del proceso
      });
    });

    console.log("🚀 [SERVER] =========================");

    /*console.log("🚀 [SERVER] Starting HTTP server...");
    this.app.listen(this.port, () => {
      console.log(
        `✅ [SERVER] API Base URL: http://localhost:${this.port}/api`
      );
    });*/
  }
}
