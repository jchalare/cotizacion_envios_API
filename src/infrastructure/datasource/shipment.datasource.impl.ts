import {
  CreateShipmentDto,
  CustomError,
  GetShipmentDto,
  ResponseShipmentDto,
  ShipmentDataSource,
  ShipmentEntity,
} from "../../domain";
import { ShipmentQueries } from "../sql/shipment.queries";

export class ShipmentDataSourceImpl implements ShipmentDataSource {
  async createShipment(
    createShipmentDto: CreateShipmentDto
  ): Promise<ShipmentEntity> {
    try {
      const guia = "G-" + this.getGuia();

      console.log(guia);

      createShipmentDto.guia = guia.toString();

      const shipmentData = await ShipmentQueries.save(createShipmentDto);

      if (!shipmentData) {
        throw CustomError.internalServer("Error al crear el envio");
      }

      // se crea el detalle del envío
      const createShipmentDetailDto = {
        idEnvio: shipmentData.id,
        item: 1,
        estado: "En espera",
        descripcion: "Paquete en recepción",
      };

      const shipmentDetailData = await ShipmentQueries.saveDetail(
        createShipmentDetailDto
      );

      if (!shipmentDetailData) {
        throw CustomError.internalServer("Error al crear el detalle del envio");
      }
      // fin de crear el detalle del envío

      const newShipment = new ResponseShipmentDto(shipmentData);

      return ShipmentEntity.fromObject(newShipment);
    } catch (error) {
      throw CustomError.internalServer(`${error}}`);
    }
  }

  async getShipment(getShipmentDto: GetShipmentDto): Promise<any> {
    const { guia } = getShipmentDto;

    const shipmentData = await ShipmentQueries.findOne("guia", guia);

    if (!shipmentData) {
      throw CustomError.badRequest("No se encontró el envío.");
    }

    const shipmentDetailData = await ShipmentQueries.findDetails(
      shipmentData.id
    );

    return {
      envio: shipmentData,
      detalles: shipmentDetailData,
    };
  }

  private getGuia(): string {
    let result = "";
    const characters = "012345";
    const charactersLength = characters.length;

    for (let i = 0; i < charactersLength; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
}
