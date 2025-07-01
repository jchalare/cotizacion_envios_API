import { CreateShipmentDto, GetShipmentDto, ShipmentEntity } from "..";

export abstract class ShipmentRepository {
  abstract createShipment(
    createShipmentDto: CreateShipmentDto
  ): Promise<ShipmentEntity>;

  abstract getShipment(getShipmentDto: GetShipmentDto): Promise<any>;
}
