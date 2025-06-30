import {
  CreateUserDto,
  UserDataSource,
  UserEntity,
  UserRepository,
} from "../../domain";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) {}

  async loginUser(loginUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userDataSource.loginUser(loginUserDto);
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.userDataSource.createUser(createUserDto);
  }
}
