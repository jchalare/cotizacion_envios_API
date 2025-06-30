import { GetQuotationDto, QuotationEntity } from "..";

export abstract class QuotationDataSource {
  abstract getQuotation(
    getQuotationDto: GetQuotationDto
  ): Promise<QuotationEntity>;
}
