import { QueryResult } from "pg";
import { pool } from "../../config";
import { CreateShipmentDto, CustomError } from "../../domain";

interface ShipmentRawData {
  id: number;
  idUsuario: number;
  articulo: string;
  peso: number;
  alto: number;
  ancho: number;
  largo: number;
  idTarifa: number;
  precioCotizacion: number;
}

export class ShipmentQueries {
  static async findOneById(id: number): Promise<ShipmentRawData | null> {
    const query = `SELECT id,id_usuario,articulo,peso,alto,ancho,largo,id_tarifa,precio_cotizacion FROM cotizaciones WHERE id = $1`;

    try {
      const response: QueryResult<ShipmentRawData> = await pool.query(query, [
        id,
      ]);
      return response.rows.length > 0 ? response.rows[0] : null;
    } catch (error) {
      console.error("Error al consultar usuario: ", error);
      throw CustomError.internalServer(`${error}}`);
    }
  }

  static async save(
    createShipmentDto: CreateShipmentDto
  ): Promise<ShipmentRawData> {
    const query = `
      INSERT INTO cotizaciones (id_usuario, articulo, peso, alto, ancho, largo, id_tarifa, precio_cotizacion)
VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING id, id_usuario, articulo, peso, alto, ancho, largo, id_tarifa, precio_cotizacion;
    `;

    try {
      const response: QueryResult<ShipmentRawData> = await pool.query(query, [
        createShipmentDto.idUsuario,
        createShipmentDto.articulo,
        createShipmentDto.peso,
        createShipmentDto.alto,
        createShipmentDto.ancho,
        createShipmentDto.largo,
        createShipmentDto.idTarifa,
        createShipmentDto.precioCotizacion,
      ]);

      if (response.rows.length === 0) {
        throw CustomError.internalServer("Error al crear la cotización");
      }

      return response.rows[0];
    } catch (error) {
      throw CustomError.internalServer(`${error}}`);
    }
  }
}
