import { Router } from "express";
import { CreateShipmentDto, GetShipmentDto } from "../../domain";
import {
  ShipmentDataSourceImpl,
  ShipmentRepositoryImpl,
  validateDto,
} from "../../infrastructure";
import { ShipmentController } from "./controller";

export class ShipmentRoutes {
  static get routes(): Router {
    const router = Router();

    const shipmentDataSource = new ShipmentDataSourceImpl();

    const shipmentRepository = new ShipmentRepositoryImpl(shipmentDataSource);

    const shipmentController = new ShipmentController(shipmentRepository);

    /**
     * @swagger
     * /shipments:
     *     post:
     *       summary: Crea la información de un envío.
     *       tags: [Envios]
     *       security:
     *         - bearerAuth: []
     *       responses:
     *         201: # Nivel de código de respuesta
     *           description: Envio realizado exitosamente.
     *           content: # Anidado bajo 201
     *             application/json: # Anidado bajo content
     *               schema: # Anidado bajo application/json
     *                 type: object
     *                 properties:
     *                   envio:
     *                     type: object
     *                     description: informacion del envio.
     *                     example: {"id":11, "guia":"G-123456","articulo":"Televisor","peso":25000.5,"alto":10,"ancho":15,"largo":20,"ciudad_origen":1,"ciudad_destino":2,"precioCotizacion":25000.5}
     *         400: # Nivel de código de respuesta
     *           description: Datos de entrada incorrectos.
     *           content: # Anidado bajo 400
     *             application/json: # Anidado bajo content
     *               schema: # Anidado bajo application/json
     *                 type: object
     *                 properties:
     *                   message:
     *                     type: string
     *                     description: Mensaje de error.
     *                     example: "Envio no encontrado."
     *                   statusCode:
     *                     type: integer
     *                     description: Código de error.
     *                     example: 400
     *     parameters:
     *       - in: body
     *         name: body
     *         description: Datos del envio.
     *         required: true
     *         schema:
     *           $ref: '#/components/schemas/envios'
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
     *             precioCotizacion:
     *               type: number
     *               format: float
     *               description: Precio de la cotización.
     *               example: 25000.5
     */
    router.post(
      "/",
      validateDto(CreateShipmentDto),
      shipmentController.createShipment.bind(shipmentController)
    );

    /**
     * @swagger
     * /shipments:
     *     get:
     *       summary: Muestra la información de un envío segun su guia.
     *       tags: [Envios]
     *       security:
     *         - bearerAuth: []
     *       responses:
     *         201: # Nivel de código de respuesta
     *           description: Datos de envio encontrados exitosamente.
     *           content: # Anidado bajo 201
     *             application/json: # Anidado bajo content
     *               schema: # Anidado bajo application/json
     *                 type: object
     *                 properties:
     *                   envio:
     *                     type: object
     *                     description: informacion del envio.
     *                     example: {"id":11, "guia":"G-123456","articulo":"Televisor","peso":25000.5,"alto":10,"ancho":15,"largo":20,"ciudad_origen":1,"ciudad_destino":2,"precioCotizacion":25000.5}
     *                   detalles:
     *                     type: object
     *                     description: Arreglo de detalles del envio.
     *                     example: [{"item":1,"estado":"En transito","descripcion":"Paquete en la via","fecha_detalle":"025-07-01T08:02:37.129Z"},{"item":2,"estado":"Entregado","descripcion":"Paquete entregado en porteria","fecha_detalle":"025-07-01T08:02:37.129Z"}]
     *         400: # Nivel de código de respuesta
     *           description: Datos de entrada incorrectos.
     *           content: # Anidado bajo 400
     *             application/json: # Anidado bajo content
     *               schema: # Anidado bajo application/json
     *                 type: object
     *                 properties:
     *                   message:
     *                     type: string
     *                     description: Mensaje de error.
     *                     example: "Envio no encontrado."
     *                   statusCode:
     *                     type: integer
     *                     description: Código de error.
     *                     example: 400
     *     parameters:
     *       - in: body
     *         name: body
     *         description: Datos del envio.
     *         required: true
     *         schema:
     *           $ref: '#/components/schemas/guia'
     *           type: object
     *           properties:
     *             guia:
     *               type: string
     *               description: Guia del envío.
     *               example: "G-123456"
     *
     */
    router.get(
      "/",
      validateDto(GetShipmentDto),
      shipmentController.getShipment.bind(shipmentController)
    );

    console.log(
      "✅ [SHIPMENT ROUTES] Quotation routes configured successfully"
    );

    return router;
  }
}
