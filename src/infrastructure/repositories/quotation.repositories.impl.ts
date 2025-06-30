import {
  GetQuotationDto,
  QuotationDataSource,
  QuotationEntity,
  QuotationRepository,
} from "../../domain";

export class QuotationRepositoryImpl implements QuotationRepository {
  constructor(private readonly quotationDataSource: QuotationDataSource) {}

  async getQuotation(getQuotation: GetQuotationDto): Promise<QuotationEntity> {
    return this.quotationDataSource.getQuotation(getQuotation);
  }
}
