import { QueryResult } from "pg";
import { pool } from "../../config";
import { CustomError } from "../../domain";

interface QuotationRawData {
  id: number;
  precio: number;
}

export class QuotationQueries {
  static async find(
    idOrigen: number,
    idDestino: number,
    peso: number
  ): Promise<QuotationRawData | null> {
    const query = `
        SELECT id,precio
        FROM tarifas
        WHERE
            id_ciudad_origen = $1 AND
            id_ciudad_destino = $2 AND
            $3 BETWEEN peso_minimo AND peso_maximo;
      `;

    try {
      const response: QueryResult<QuotationRawData> = await pool.query(query, [
        idOrigen,
        idDestino,
        peso,
      ]);
      return response.rows.length > 0 ? response.rows[0] : null;
    } catch (error) {
      console.error("Error al consultar la tarifa: ", error);
      throw CustomError.internalServer(`${error}}`);
    }
  }
}
