import { UserEntity } from "..";
import { CreateUserDto, LoginUserDto } from "../dtos";

export interface ResponseUserInterface {
  usuario: UserEntity;
  token: any;
}

export abstract class UserDataSource {
  abstract createUser(
    createUserDto: CreateUserDto
  ): Promise<ResponseUserInterface>;
  abstract loginUser(
    loginUserDto: LoginUserDto
  ): Promise<ResponseUserInterface>;
}
