import jwt, { SignOptions, Secret } from "jsonwebtoken"; // Importa 'Secret' también
import { envs } from "./envs";

export class JwtAdapter {
  static async generateToken(
    payload: any,
    duration: number = 2 * 60 * 60 // 2 horas
  ) {
    // 1. Asegúrate de que envs.jwtSecret es una cadena válida.
    // Si no lo es, TypeScript podría estar interpretándolo como 'null' o 'undefined'.
    const jwtSecret: Secret = envs.jwtSecret; // Declara explícitamente el tipo

    if (!jwtSecret || jwtSecret.length === 0) {
      // Manejar el caso donde el secreto no está configurado.
      // Esto es crucial para la seguridad y para evitar el error.
      const error = new Error(
        "JWT_SECRET no está configurado en las variables de entorno."
      );
      console.error(error); // Loggea el error para depuración
      return Promise.reject(error); // Rechaza la promesa
    }

    const options: SignOptions = { expiresIn: duration }; // Esto debería estar bien ahora

    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        jwtSecret, // Aquí pasamos la variable ya verificada
        options,
        (err, token) => {
          if (err) {
            console.error("Error al generar el token JWT:", err);
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    });
  }
}
