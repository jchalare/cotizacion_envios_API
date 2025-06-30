import { Router } from "express";
import {
  UserDataSourceImpl,
  UserRepositoryImpl,
  validateDto,
} from "../../infrastructure";
import { UserController } from "./controller";
import { CreateUserDto, LoginUserDto } from "../../domain";

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
