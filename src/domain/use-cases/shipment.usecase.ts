import { ShipmentEntity, ShipmentRepository } from "..";
import { CreateShipmentDto, GetShipmentDto } from "../dtos";

export interface ShipmentUseCaseInterface {
  executeCreateShipment(dto: CreateShipmentDto): Promise<ShipmentEntity>;
  executeGetShipment(dto: GetShipmentDto): Promise<any>;
}

export class ShipmentUseCase implements ShipmentUseCaseInterface {
  constructor(private readonly repository: ShipmentRepository) {}

  executeCreateShipment(dto: CreateShipmentDto): Promise<ShipmentEntity> {
    return this.repository.createShipment(dto);
  }

  executeGetShipment(dto: GetShipmentDto): Promise<any> {
    return this.repository.getShipment(dto);
  }
}
