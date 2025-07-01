import { Request, Response, NextFunction } from "express";
import { validate, ValidationError } from "class-validator"; // Importa ValidationError
import { plainToInstance } from "class-transformer";

// Función auxiliar para obtener mensajes de error recursivamente
const getErrorMessages = (errors: ValidationError[]): string[] => {
  let messages: string[] = [];
  errors.forEach((error) => {
    if (error.constraints) {
      messages.push(...Object.values(error.constraints));
    }
    if (error.children && error.children.length > 0) {
      // Si hay errores anidados (ej. en un objeto dentro del DTO)
      messages.push(...getErrorMessages(error.children));
    }
  });
  return messages;
};

// Este es un middleware generador, toma un DTO y devuelve un middleware de Express
export const validateDto = (dtoClass: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);

    validate(dtoInstance, {
      whitelist: true,
      forbidNonWhitelisted: true,
    }).then((errors) => {
      if (errors.length > 0) {
        // Usa la función auxiliar para obtener todos los mensajes de error
        const allErrorMessages = getErrorMessages(errors);

        console.log(
          "❌ [VALIDATION] Validation failed with errors:",
          JSON.stringify(errors, null, 2)
        );
        console.log(
          "💬 [VALIDATION] Formatted error messages:",
          allErrorMessages
        ); // <-- Para depuración

        return res.status(400).json({
          message: "Errores de validación",
          errors: allErrorMessages, // Retorna un array de mensajes de error
        });
      } else {
        req.body = dtoInstance;
        console.log("✅ [VALIDATION] Data passed to controller");
        next();
      }
    });
  };
};
