import {
  CreateShipmentDto,
  CustomError,
  ShipmentDataSource,
} from "../../domain";

export class ShipmentDataSourceImpl implements ShipmentDataSource {
  async createShipment(createShipmentDto: CreateShipmentDto): Promise<any> {
    /*const { idCiudadOrigen, idCiudadDestino, peso } = createShipmentDto;

    // Se debe realizar la cotización con el peso mayor entre peso y peso volumen (alto*ancho*largo/2500 aproximando al valor entero superior en caso de tener decimales).
    const weightVolume = Math.ceil(
      (createShipmentDto.alto *
        createShipmentDto.ancho *
        createShipmentDto.largo) /
        2500
    );

    const realWeight = peso > weightVolume ? peso : weightVolume;

    const rateData = await RateQueries.find(
      idCiudadOrigen,
      idCiudadDestino,
      realWeight
    );

    if (!rateData) {
      throw CustomError.badRequest(
        "No se encontró una tarifa para la cotización."
      );
    }

    createShipmentDto.idTarifa = rateData.id;
    createShipmentDto.precioCotizacion = rateData.precio;

    console.log("createShipmentDto nuevo ====> ", createShipmentDto);*/
    //const newQuotation = await QuotationQueries.save(createShipmentDto);
    //return new QuotationEntity(newQuotation);
  }
}
