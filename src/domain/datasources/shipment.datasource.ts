import { CreateShipmentDto, GetShipmentDto, ShipmentEntity } from "..";

export abstract class ShipmentDataSource {
  abstract createShipment(
    createShipmentDto: CreateShipmentDto
  ): Promise<ShipmentEntity>;

  abstract getShipment(getShipmentDto: GetShipmentDto): Promise<any>;
}
