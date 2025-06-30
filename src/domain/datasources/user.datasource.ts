import { CreateUserDto, LoginUserDto } from "../dtos";
import { UserEntity } from "../entities/user.entity";

export interface ResponseUserInterface {
  user: UserEntity;
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
