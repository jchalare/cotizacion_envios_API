import { CreateUserDto, LoginUserDto } from "../dtos";
import { UserEntity } from "../entities/user.entity";

export abstract class UserRepository {
  abstract createUser(createUserDto: CreateUserDto): Promise<UserEntity>;
  abstract loginUser(loginUserDto: LoginUserDto): Promise<UserEntity>;
}
