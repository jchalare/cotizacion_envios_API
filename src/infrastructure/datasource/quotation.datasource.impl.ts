import { QuotationQueries } from "..";
import {
  CustomError,
  GetQuotationDto,
  QuotationDataSource,
  QuotationEntity,
} from "../../domain";

export class QuotationDataSourceImpl implements QuotationDataSource {
  async getQuotation(
    getQuotationDto: GetQuotationDto
  ): Promise<QuotationEntity> {
    const { idCiudadOrigen, idCiudadDestino, peso } = getQuotationDto;

    const formatWeight = Math.ceil(peso);

    // Se debe realizar la cotización con el peso mayor entre peso y peso volumen (alto*ancho*largo/2500 aproximando al valor entero superior en caso de tener decimales).
    const weightVolume = Math.ceil(
      (getQuotationDto.alto * getQuotationDto.ancho * getQuotationDto.largo) /
        2500
    );
    const realWeight =
      formatWeight > weightVolume ? formatWeight : weightVolume;

    const quotationData = await QuotationQueries.find(
      idCiudadOrigen,
      idCiudadDestino,
      realWeight
    );

    if (!quotationData) {
      throw CustomError.badRequest(
        "No se encontró una tarifa para la cotización."
      );
    }

    return QuotationEntity.fromObject(quotationData);
  }
}
