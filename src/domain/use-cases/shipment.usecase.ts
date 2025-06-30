import { ShipmentEntity, ShipmentRepository } from "..";
import { CreateShipmentDto } from "../dtos";

export interface ShipmentUseCaseInterface {
  executeCreateShipment(dto: CreateShipmentDto): Promise<ShipmentEntity>;
}

export class ShipmentUseCase implements ShipmentUseCaseInterface {
  constructor(private readonly repository: ShipmentRepository) {}

  executeCreateShipment(dto: CreateShipmentDto): Promise<ShipmentEntity> {
    return this.repository.createShipment(dto);
  }
}
