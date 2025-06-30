import { CreateShipmentDto, ShipmentEntity } from "..";

export abstract class ShipmentDataSource {
  abstract createShipment(
    createShipmentDto: CreateShipmentDto
  ): Promise<ShipmentEntity>;
}
