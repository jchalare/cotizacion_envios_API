import { CreateShipmentDto, QuotationEntity, QuotationRepository } from "..";

export interface QuotationUseCaseInterface {
  executeGetQuotation(dto: CreateShipmentDto): Promise<QuotationEntity>;
}

export class QuotationUseCase implements QuotationUseCaseInterface {
  constructor(private readonly repository: QuotationRepository) {}

  executeGetQuotation(dto: CreateShipmentDto): Promise<QuotationEntity> {
    return this.repository.getQuotation(dto);
  }
}
