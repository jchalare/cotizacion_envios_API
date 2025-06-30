import { Router } from "express";
import { GetQuotationDto } from "../../domain";
import {
  QuotationDataSourceImpl,
  QuotationRepositoryImpl,
  validateDto,
} from "../../infrastructure";
import { QuotationController } from "./controller";

export class QuotationRoutes {
  static get routes(): Router {
    const router = Router();

    const quotationDataSource = new QuotationDataSourceImpl();

    const quotationRepository = new QuotationRepositoryImpl(
      quotationDataSource
    );

    const quotationController = new QuotationController(quotationRepository);

    router.get(
      "/",
      validateDto(GetQuotationDto),
      quotationController.getQuotation.bind(quotationController)
    );

    console.log(
      "✅ [QUOTATION ROUTES] Quotation routes configured successfully"
    );

    return router;
  }
}
