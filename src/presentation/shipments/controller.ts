import { Response, Request } from "express";
import {
  CreateShipmentDto,
  GetShipmentDto,
  HandleError,
  ShipmentRepository,
  ShipmentUseCase,
} from "../../domain";
import { redisClient } from "../../config";
import { cacheService } from "../../infrastructure";

const SHIPMENT_CACHE_TTL_SECONDS = 3600; //  1 hora

export class ShipmentController {
  constructor(private readonly shipmentRepository: ShipmentRepository) {}

  public createShipment = (req: Request, res: Response) => {
    const createShipmentDto: CreateShipmentDto = req.body;

    new ShipmentUseCase(this.shipmentRepository)
      .executeCreateShipment(createShipmentDto!)
      .then((shipment) => {
        res.status(201).json(shipment);
      })
      .catch((error) => {
        HandleError.showError(error, res);
      });
  };

  public getShipment = async (req: Request, res: Response): Promise<any> => {
    const getShipmentDto: GetShipmentDto = req.body;

    const { guia } = getShipmentDto;

    const cacheKey = `shipment:${guia}`;

    try {
      // 1. Usa el servicio de caché para obtener
      const cachedShipment = await cacheService.get<any>(cacheKey);
      if (cachedShipment) {
        // Si encontramos el envío en caché (Cache Hit), lo devolvemos inmediatamente.
        console.log(`✅ [REDIS] Envío con guía ${guia} obtenido de la caché.`);
        res.status(200).json(cachedShipment);
        return; // Terminamos la ejecución aquí
      }

      const shipment = await new ShipmentUseCase(
        this.shipmentRepository
      ).executeGetShipment(getShipmentDto!);

      console.log(shipment);

      // 3. Usa el servicio de caché para guardar
      await cacheService.set(cacheKey, shipment, {
        ttlSeconds: SHIPMENT_CACHE_TTL_SECONDS,
      });

      return res.status(200).json(shipment);
    } catch (error) {
      HandleError.showError(error as Error, res);
    }
  };
}
