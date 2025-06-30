import {
  CreateShipmentDto,
  ShipmentDataSource,
  ShipmentEntity,
  ShipmentRepository,
} from "../../domain";

export class ShipmentRepositoryImpl implements ShipmentRepository {
  constructor(private readonly shipmentDataSource: ShipmentDataSource) {}

  async createShipment(
    createShipmentDto: CreateShipmentDto
  ): Promise<ShipmentEntity> {
    return this.shipmentDataSource.createShipment(createShipmentDto);
  }
}
