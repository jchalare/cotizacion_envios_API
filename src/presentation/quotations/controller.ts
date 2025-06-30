import { Response, Request } from "express";
import {
  GetQuotationDto,
  HandleError,
  QuotationRepository,
  QuotationUseCase,
} from "../../domain";

export class QuotationController {
  constructor(private readonly quotationRepository: QuotationRepository) {}

  public getQuotation = (req: Request, res: Response) => {
    const getQuotationDto: GetQuotationDto = req.body;

    new QuotationUseCase(this.quotationRepository)
      .executeGetQuotation(getQuotationDto!)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => {
        HandleError.showError(error, res);
      });
  };
}
