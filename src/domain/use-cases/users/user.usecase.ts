import { CreateUserDto, LoginUserDto } from "../../dtos";
import { UserEntity } from "../../entities/user.entity";
import { UserRepository } from "../../repositories/user.repository";

export interface UserUseCaseInterface {
  executeCreateUser(dto: CreateUserDto): Promise<UserEntity>;
  executeLoginUser(dto: LoginUserDto): Promise<UserEntity>;
}

export class UserUseCase implements UserUseCaseInterface {
  constructor(private readonly repository: UserRepository) {}

  executeCreateUser(dto: CreateUserDto): Promise<UserEntity> {
    return this.repository.createUser(dto);
  }

  executeLoginUser(dto: LoginUserDto): Promise<UserEntity> {
    return this.repository.loginUser(dto);
  }
}
