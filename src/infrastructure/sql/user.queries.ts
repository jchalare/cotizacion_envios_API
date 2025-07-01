import { pool } from "../../config/database";
import { QueryResult } from "pg";
import { CreateUserDto, CustomError } from "../../domain";

// Define una interfaz para los datos crudos que vienen de la base de datos
// Esto ayuda a manejar los nombres de columna de la DB vs. los de la entidad
interface UserRawData {
  id: string;
  nombre: string;
  apellido: string;
  numeroTelefono: string;
  numeroIdentificacion: string;
  email: string;
  password: string; // Este es el password_hash de la DB
}

export class UserQueries {
  // Consulta para obtener un usuario por una clave y valor
  // Retorna UserRawData para que el DataSource pueda manejar el mapeo y la seguridad
  static async findOne(
    key: "numeroIdentificacion" | "email" | "id", // Limita las claves permitidas
    value: string
  ): Promise<UserRawData | null> {
    let columnName: string;

    if (key === "numeroIdentificacion") {
      columnName = "numero_identificacion";
    } else if (key === "email") {
      columnName = "email";
    } else if (key === "id") {
      columnName = "id";
    } else {
      // Esto debería ser un error que no debería ocurrir si el DataSource valida bien
      console.error(
        `Error: Clave inválida pasada a UserQueries.finOne: ${key}`
      );
      return null; // O lanza un error de desarrollo/interno
    }

    const query = `SELECT id, nombre, apellido, numero_telefono, numero_identificacion, email, password FROM usuarios WHERE ${columnName} = $1`;

    try {
      const response: QueryResult<UserRawData> = await pool.query(query, [
        value,
      ]);
      return response.rows.length > 0 ? response.rows[0] : null;
    } catch (error) {
      console.error("Error al consultar usuario: ", error);
      throw CustomError.internalServer(`${error}}`);
    }
  }

  static async save(createUserDto: CreateUserDto): Promise<UserRawData> {
    const query = `
      INSERT INTO usuarios (nombre, apellido, numero_telefono, numero_identificacion, email, password)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, nombre, apellido, numero_telefono, numero_identificacion, email, password;
    `;

    try {
      const response: QueryResult<UserRawData> = await pool.query(query, [
        createUserDto.nombre,
        createUserDto.apellido,
        createUserDto.numeroTelefono,
        createUserDto.numeroIdentificacion,
        createUserDto.email,
        createUserDto.password,
      ]);

      if (response.rows.length === 0) {
        throw CustomError.internalServer("Error al crear el usuario");
      }

      return response.rows[0];
    } catch (error) {
      throw CustomError.internalServer(`${error}}`);
    }
  }
}
