import { NextFunction, Request, Response } from "express";
import { jwtAdapter } from "../../config";
import { ResponseUserDto, UserEntity } from "../../domain";
import { UserQueries } from "../sql/user.queries";

export class AuthMiddleware {
  static async validateJWT(req: Request, res: Response, next: NextFunction) {
    const authorization = req.header("Authorization");
    if (!authorization)
      return res.status(401).json({ error: "No token provided" });
    if (!authorization.startsWith("Bearer "))
      return res.status(401).json({ error: "Invalid Bearer token" });

    const token = authorization.split(" ").at(1) || "";

    try {
      const payload = await jwtAdapter.verifyToken<{ id: string }>(token);
      if (!payload) return res.status(401).json({ error: "Invalid token" });

      // Verificar si el usuario existe en la base de datos
      const user = await UserQueries.findOne("id", payload.id);
      if (!user) return res.status(401).json({ error: "Invalid token - user" });

      const validatedUser = new ResponseUserDto(user).showPublicUserData();

      req.body.user = UserEntity.fromObject(validatedUser);

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
