import { Response, Request } from "express";
import {
  UserUseCase,
  CreateUserDto,
  HandleError,
  UserRepository,
} from "../../domain";

export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  public createUser = (req: Request, res: Response) => {
    const createUserDto: CreateUserDto = req.body; // <--- Puedes tiparlo directamente

    new UserUseCase(this.userRepository)
      .executeCreateUser(createUserDto!)
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => {
        HandleError.showError(error, res);
      });
  };

  public loginUser = (req: Request, res: Response) => {
    const loginUserDto = req.body;

    new UserUseCase(this.userRepository)
      .executeLoginUser(loginUserDto!)
      .then((user) => {
        res.status(200).json(user);
      })
      .catch((error) => {
        HandleError.showError(error, res);
      });
  };
}
