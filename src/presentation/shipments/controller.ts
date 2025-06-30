import { Response, Request } from "express";
import {
  CreateShipmentDto,
  HandleError,
  ShipmentRepository,
  ShipmentUseCase,
} from "../../domain";

export class ShipmentController {
  constructor(private readonly shipmentRepository: ShipmentRepository) {}

  public createShipment = (req: Request, res: Response) => {
    const createShipmentDto: CreateShipmentDto = req.body;

    new ShipmentUseCase(this.shipmentRepository)
      .executeCreateShipment(createShipmentDto!)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => {
        HandleError.showError(error, res);
      });
  };
}
