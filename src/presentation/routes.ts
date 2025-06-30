import { Router } from "express";
import { UserRoutes } from "./users/routes";
import { AuthMiddleware } from "../infrastructure";
import { ShipmentRoutes } from "./shipments/routes";
import { QuotationRoutes } from "./quotations/routes";

export class AppRoutes {
  static get routes(): Router {
    const router = Router();

    console.log("🗺️ [ROUTES] Registering routes...");

    router.use("/api/users", UserRoutes.routes); // Rutas de usuarios
    router.use(
      "/api/shipments",
      AuthMiddleware.validateJWT,
      ShipmentRoutes.routes
    ); // Rutas de evios
    router.use(
      "/api/quotations",
      AuthMiddleware.validateJWT,
      QuotationRoutes.routes
    ); // Rutas de cotizaciones

    return router;
  }
}
