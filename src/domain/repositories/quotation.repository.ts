import { GetQuotationDto, QuotationEntity } from "..";

export abstract class QuotationRepository {
  abstract getQuotation(
    getQuotationDto: GetQuotationDto
  ): Promise<QuotationEntity>;
}
