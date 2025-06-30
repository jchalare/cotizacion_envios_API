// src/infrastructure/middleware/auth.middleware.ts

import { NextFunction, Request, Response } from "express";
import { jwtAdapter } from "../../config";
import { ResponseUserDto, UserEntity } from "../../domain";
import { UserQueries } from "../sql/user.queries";

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");
    if (!authorization) {
      res.status(401).json({ error: "No se ha proporcionado un token" });
      return;
    }
    if (!authorization.startsWith("Bearer ")) {
      res.status(401).json({ error: "Bearer token invalido" });
      return;
    }

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await jwtAdapter.verifyToken<{ id: string }>(token);
      if (!payload) {
        res.status(401).json({ error: "Token inválido" });
        return;
      }

      // Verificar si el usuario existe en la base de datos
      const userRawData = await UserQueries.findOne("id", payload.id);
      if (!userRawData) {
        res.status(401).json({ error: "Token no válido" });
        return;
      }

      const validatedUser = new ResponseUserDto(
        userRawData
      ).showPublicUserData();

      req.body.idUsuario = UserEntity.fromObject(validatedUser).id;

      next();
    } catch (error) {
      console.error("Error en AuthMiddleware.validateJWT:", error);
      res.status(500).json({ error: "Token vencido" });
      return;
    }
  }
}
