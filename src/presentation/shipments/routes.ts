import { Router } from "express";
import { CreateShipmentDto } from "../../domain";
import {
  ShipmentDataSourceImpl,
  ShipmentRepositoryImpl,
  validateDto,
} from "../../infrastructure";
import { ShipmentController } from "./controller";

export class ShipmentRoutes {
  static get routes(): Router {
    const router = Router();

    const shipmentDataSource = new ShipmentDataSourceImpl();

    const shipmentRepository = new ShipmentRepositoryImpl(shipmentDataSource);

    const shipmentController = new ShipmentController(shipmentRepository);

    router.post(
      "/",
      validateDto(CreateShipmentDto),
      shipmentController.createShipment.bind(shipmentController)
    );

    console.log(
      "✅ [SHIPMENT ROUTES] Quotation routes configured successfully"
    );

    return router;
  }
}
