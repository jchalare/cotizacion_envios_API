import { ResponseUserInterface, UserRepository } from "..";
import { CreateUserDto, LoginUserDto } from "../dtos";

export interface UserUseCaseInterface {
  executeCreateUser(dto: CreateUserDto): Promise<ResponseUserInterface>;
  executeLoginUser(dto: LoginUserDto): Promise<ResponseUserInterface>;
}

export class UserUseCase implements UserUseCaseInterface {
  constructor(private readonly repository: UserRepository) {}

  executeCreateUser(dto: CreateUserDto): Promise<ResponseUserInterface> {
    return this.repository.createUser(dto);
  }

  executeLoginUser(dto: LoginUserDto): Promise<ResponseUserInterface> {
    return this.repository.loginUser(dto);
  }
}
