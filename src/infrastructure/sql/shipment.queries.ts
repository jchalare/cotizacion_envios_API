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
  precioCotizacion: number;
  guia: number;
  idCiudadOrigen: number;
  idCiudadDestino: number;
}

interface ShipmentDetailRawData {
  idEnvio: number;
  item: number;
  estado: string;
  descripcion: string;
  fechaDetalle: Date;
}

export class ShipmentQueries {
  static async save(
    createShipmentDto: CreateShipmentDto
  ): Promise<ShipmentRawData> {
    console.log("createShipmentDto ====> ", createShipmentDto);

    const query = `
      INSERT INTO envios (id_usuario, articulo, peso, alto, ancho, largo,  precio_cotizacion, guia, id_ciudad_origen, id_ciudad_destino)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id, id_usuario, articulo, peso, alto, ancho, largo,  precio_cotizacion, guia, id_ciudad_origen, id_ciudad_destino;
    `;

    try {
      const response: QueryResult<ShipmentRawData> = await pool.query(query, [
        createShipmentDto.idUsuario,
        createShipmentDto.articulo,
        createShipmentDto.peso,
        createShipmentDto.alto,
        createShipmentDto.ancho,
        createShipmentDto.largo,
        createShipmentDto.precioCotizacion,
        createShipmentDto.guia,
        createShipmentDto.idCiudadOrigen,
        createShipmentDto.idCiudadDestino,
      ]);

      if (response.rows.length === 0) {
        throw CustomError.internalServer("Error al crear el envio");
      }

      return response.rows[0];
    } catch (error) {
      throw CustomError.internalServer(`${error}}`);
    }
  }

  static async saveDetail(dto: any): Promise<ShipmentDetailRawData> {
    const query = `
      INSERT INTO detalles_envios (id_envio, item, estado, descripcion)
      VALUES ($1, $2, $3, $4)
     RETURNING id_envio, item, estado, descripcion,fecha_detalle;
    `;

    try {
      const response: QueryResult<ShipmentDetailRawData> = await pool.query(
        query,
        [dto.idEnvio, dto.item, dto.estado, dto.descripcion]
      );

      if (response.rows.length === 0) {
        throw CustomError.internalServer("Error al crear el envio");
      }

      return response.rows[0];
    } catch (error) {
      throw CustomError.internalServer(`${error}}`);
    }
  }

  static async findOne(key: string, value: any): Promise<any | null> {
    let columnName: string;

    if (key === "guia") {
      columnName = "guia";
    } else if (key === "e.id") {
      columnName = "id";
    } else {
      // Esto debería ser un error que no debería ocurrir si el DataSource valida bien
      console.error(
        `Error: Clave inválida pasada a UserQueries.finOne: ${key}`
      );
      return null; // O lanza un error de desarrollo/interno
    }

    const query = `SELECT e.id,guia,articulo,precio_cotizacion,co.nombre as ciudad_origen, cd.nombre as ciudad_destino,
                  id_usuario
                  FROM envios e INNER JOIN ciudades co ON e.id_ciudad_origen = co.id
                  INNER JOIN ciudades cd ON e.id_ciudad_destino = cd.id
                  WHERE ${columnName} = $1`;

    try {
      const response: QueryResult = await pool.query(query, [value]);
      return response.rows.length > 0 ? response.rows[0] : null;
    } catch (error) {
      console.error("Error al consultar usuario: ", error);
      throw CustomError.internalServer(`${error}}`);
    }
  }

  static async findDetails(idEnvio: number): Promise<any> {
    const query = `SELECT item, estado, descripcion,fecha_detalle FROM detalles_envios WHERE id_envio = $1 ORDER BY
        fecha_detalle ASC, item ASC; `;

    try {
      const response: QueryResult<any> = await pool.query(query, [idEnvio]);
      return response.rows;
    } catch (error) {
      console.error("Error al consultar detalle del envío: ", error);
      throw CustomError.internalServer(`${error}}`);
    }
  }
}
