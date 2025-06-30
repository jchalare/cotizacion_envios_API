import { Router } from "express";
import { UserController } from "./controller";
import { UserDataSourceImpl } from "../../infrastructure/datasource/user.datasource.impl";
import { UserRepositoryImpl } from "../../infrastructure/repositories/user.repositories.impl";
import { CreateUserDto, LoginUserDto } from "../../domain";
import { validateDto } from "../../infrastructure/middlewares/validation.dto.middleware";

export class UserRoutes {
  static get routes(): Router {
    const router = Router();

    const userDataSource = new UserDataSourceImpl();

    const userRepository = new UserRepositoryImpl(userDataSource);

    const userController = new UserController(userRepository);

    router.post(
      "/",
      validateDto(CreateUserDto),
      userController.createUser.bind(userController)
    );

    router.post(
      "/login",
      validateDto(LoginUserDto),
      userController.loginUser.bind(userController)
    );

    console.log("✅ [USER ROUTES] User routes configured successfully");

    return router;
  }
}
