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

    /**
     * @swagger
     * /quotations:
     *     get:
     *       summary: Realiza una nueva cotización de envío.
     *       tags: [Cotizaciones]
     *       security:
     *         - bearerAuth: []
     *       responses:
     *         201: # Nivel de código de respuesta
     *           description: Cotización realizada exitosamente.
     *           content: # Anidado bajo 201
     *             application/json: # Anidado bajo content
     *               schema: # Anidado bajo application/json
     *                 type: object
     *                 properties:
     *                   id:
     *                     type: integer
     *                     description: ID de la tarifa.
     *                     example: 101
     *                   precio:
     *                     type: number
     *                     format: float
     *                     description: Precio de la cotización.
     *                     example: 25000.50
     *         400: # Nivel de código de respuesta
     *           description: Datos de entrada incorrectos.
     *           content: # Anidado bajo 400
     *             application/json: # Anidado bajo content
     *               schema: # Anidado bajo application/json
     *                 type: object
     *                 properties:
     *                   error:
     *                     type: string
     *                     description: Descripción del error.
     *                     example: "Falta el campo 'articulo'."
     *                   message:
     *                     type: string
     *                     description: Mensaje de error.
     *                     example: "Falta el campo 'articulo'."
     *                   statusCode:
     *                     type: integer
     *                     description: Código de error.
     *                     example: 400
     *     parameters:
     *       - in: body
     *         name: body
     *         description: Datos de la cotización.
     *         required: true
     *         schema:
     *           $ref: '#/components/schemas/cotizaciones'
     *           type: object
     *           properties:
     *             articulo:
     *               type: string
     *               description: Descripción del artículo a cotizar.
     *               example: "Libros de texto"
     *             peso:
     *               type: number
     *               format: float
     *               description: Peso del paquete en kg.
     *               example: 5.5
     *             alto:
     *               type: number
     *               format: integer
     *               description: Altura del paquete en cm.
     *               example: 10
     *             ancho:
     *               type: number
     *               format: integer
     *               description: Ancho del paquete en cm.
     *               example: 15
     *             largo:
     *               type: number
     *               format: integer
     *               description: Largo del paquete en cm.
     *               example: 20
     *             idCiudadOrigen:
     *               type: integer
     *               description: ID de la ciudad de origen.
     *               example: 1
     *             idCiudadDestino:
     *               type: integer
     *               description: ID de la ciudad de destino.
     *               example: 2
     */

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
