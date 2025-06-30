import { CreateUserDto, LoginUserDto, ResponseUserInterface } from "..";

export abstract class UserRepository {
  abstract createUser(
    createUserDto: CreateUserDto
  ): Promise<ResponseUserInterface>;
  abstract loginUser(
    loginUserDto: LoginUserDto
  ): Promise<ResponseUserInterface>;
}
