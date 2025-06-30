// src/presentation/middlewares/validation.middleware.ts

import { Request, Response, NextFunction } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

// Este es un middleware generador, toma un DTO y devuelve un middleware de Express
export const validateDto = (dtoClass: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // 1. Transforma el cuerpo de la petición (objeto plano) a una instancia del DTO
    // Esto es crucial para que los decoradores de class-validator funcionen.
    const dtoInstance = plainToInstance(dtoClass, req.body);

    // 2. Valida la instancia del DTO
    validate(dtoInstance, {
      whitelist: true, // Elimina propiedades que no estén definidas en el DTO
      forbidNonWhitelisted: true, // Lanza error si hay propiedades no definidas en el DTO
      // skipMissingProperties: false, // Por defecto es false, valida todos los campos
    }).then((errors) => {
      if (errors.length > 0) {
        console.log(
          "❌ [VALIDATION] Validation failed with errors:",
          JSON.stringify(errors, null, 2)
        );

        // 3. Si hay errores, extrae los mensajes y envía una respuesta de error 400
        const errorMessages = errors
          .map((error) => {
            // Flatten validation errors into an array of strings
            if (error.constraints) {
              return Object.values(error.constraints).join(", ");
            }
            return `Error en ${error.property}: ${Object.values(
              error.children![0].constraints!
            ).join(", ")}`;
          })
          .join("; "); // Unir todos los mensajes en una sola cadena o un array si prefieres

        return res.status(400).json({
          message: "Errores de validación",
          errors: errorMessages, // O errors.map(error => error.constraints) para un array más detallado
        });
      } else {
        // 4. Si la validación es exitosa, reemplaza req.body con la instancia validada del DTO
        // Esto es útil si quieres trabajar con la instancia tipada del DTO en tu controlador
        req.body = dtoInstance;
        console.log("✅ [VALIDATION] Data passed to controller");
        next(); // Permite que la petición continúe al siguiente middleware o controlador
      }
    });
  };
};
