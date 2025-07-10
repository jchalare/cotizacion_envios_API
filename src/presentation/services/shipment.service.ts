import { get } from "http";
import { GetShipmentDto, ShipmentRepository } from "../../domain";
import { WssService } from "./websocket.service";

export class ShipmentService {
  constructor(
    private readonly wssService = WssService.instance,
    private readonly shipmentRepository: ShipmentRepository
  ) {}

  public lastShipmentDetail(getShipmentDto: GetShipmentDto) {
    return this.shipmentRepository.getShipment(getShipmentDto);
  }

  private onWorkingOnChanged() {
    this.wssService.sendMessage("on-working-changed", this.lastShipmentDetail);
  }
}
