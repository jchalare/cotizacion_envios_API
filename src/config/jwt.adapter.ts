import jwt, { SignOptions, Secret } from "jsonwebtoken"; // Importa 'Secret' también
import { envs } from "./envs";

export const jwtAdapter = {
  async generateToken(
    payload: any,
    duration: number = 2 * 60 * 60 // 2 horas
  ) {
    const jwtSecret: Secret = envs.jwtSecret;

    if (!jwtSecret || jwtSecret.length === 0) {
      const error = new Error(
        "JWT_SECRET no está configurado en las variables de entorno."
      );
      console.error(error); // Loggea el error para depuración
      return Promise.reject(error); // Rechaza la promesa
    }

    const options: SignOptions = { expiresIn: duration };
    return new Promise((resolve, reject) => {
      jwt.sign(payload, jwtSecret, options, (err, token) => {
        if (err) {
          console.error("Error al generar el token JWT:", err);
          reject(err);
        } else {
          resolve(token);
        }
      });
    });
  },

  async verifyToken<T extends object>(token: string): Promise<T | null> {
    const jwtSecret: Secret = envs.jwtSecret;

    if (!jwtSecret || jwtSecret.length === 0) {
      const error = new Error(
        "JWT_SECRET no está configurado en las variables de entorno."
      );
      console.error(error); // Loggea el error para depuración
      return Promise.reject(error); // Rechaza la promesa
    }

    return new Promise((resolve, reject) => {
      jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
          console.error("Error al verificar el token JWT:", err);
          reject(err);
        } else {
          resolve(decoded as T);
        }
      });
    });
  },
};
