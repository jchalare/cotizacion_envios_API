import express, { Router } from "express";
import cors from "cors"; // <-- ¡Añade esta línea!

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

    //* Middlewares
    this.app.use(express.json());

    this.app.use(cors()); // CORS

    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    //* Routes
    this.app.use(this.routes);

    console.log("🚀 [SERVER] Starting HTTP server...");
    this.app.listen(this.port, () => {
      console.log(
        `✅ [SERVER] API Base URL: http://localhost:${this.port}/api`
      );
    });
  }
}
