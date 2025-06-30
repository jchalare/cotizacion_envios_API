import { CreateShipmentDto, ShipmentEntity } from "..";

export abstract class ShipmentRepository {
  abstract createShipment(
    createShipmentDto: CreateShipmentDto
  ): Promise<ShipmentEntity>;
}
