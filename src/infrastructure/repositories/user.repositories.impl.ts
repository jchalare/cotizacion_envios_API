import {
  CreateUserDto,
  ResponseUserInterface,
  UserDataSource,
  UserEntity,
  UserRepository,
} from "../../domain";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly userDataSource: UserDataSource) {}

  async loginUser(loginUserDto: CreateUserDto): Promise<ResponseUserInterface> {
    return this.userDataSource.loginUser(loginUserDto);
  }

  async createUser(
    createUserDto: CreateUserDto
  ): Promise<ResponseUserInterface> {
    return this.userDataSource.createUser(createUserDto);
  }
}
