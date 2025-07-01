import { Router } from "express";
import { AuthMiddleware } from "../infrastructure";
import { QuotationRoutes } from "./quotations/routes";
import { UserRoutes } from "./users/routes";
import { ShipmentRoutes } from "./shipments/routes";

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
