import { UserQueries } from "..";
import { bcryptAdapter, jwtAdapter } from "../../config";
import {
  CreateUserDto,
  CustomError,
  LoginUserDto,
  ResponseUserDto,
  ResponseUserInterface,
  UserDataSource,
  UserEntity,
} from "../../domain";

export class UserDataSourceImpl implements UserDataSource {
  async loginUser(loginUserDto: LoginUserDto): Promise<ResponseUserInterface> {
    const { numeroIdentificacion, password } = loginUserDto;

    const existingUserByIdNumber = await UserQueries.findOne(
      "numeroIdentificacion",
      numeroIdentificacion
    );

    if (!existingUserByIdNumber) {
      throw CustomError.badRequest("El usuario no existe");
    }

    const isPasswordValid = bcryptAdapter.comparePassword(
      password,
      existingUserByIdNumber.password
    );

    if (!isPasswordValid) {
      throw CustomError.unauthorized("Los datos ingresados NO son correctos");
    }

    const { id, nombre, apellido, email } = existingUserByIdNumber;

    const token = await jwtAdapter.generateToken({
      id,
      nombre,
      apellido,
      email,
    });
    const logedUser = new ResponseUserDto(existingUserByIdNumber);

    return {
      user: UserEntity.fromObject(logedUser.showPublicUserData()),
      token: token,
    };
  }

  async createUser(
    createUserDto: CreateUserDto
  ): Promise<ResponseUserInterface> {
    const { numeroIdentificacion, email, password, nombre, apellido } =
      createUserDto;

    const existingUserByIdNumber = await UserQueries.findOne(
      "numeroIdentificacion",
      numeroIdentificacion
    );

    const existingUserByEmail = await UserQueries.findOne("email", email);

    if (existingUserByIdNumber || existingUserByEmail) {
      throw CustomError.badRequest(
        "El usuario ya existe, verifica el numero de identificación o el email"
      );
    }

    try {
      createUserDto.password = bcryptAdapter.hashPassword(password);

      const response = await UserQueries.save(createUserDto);

      const token = await jwtAdapter.generateToken({
        id: response.id,
        nombre,
        apellido,
        email,
      });

      const newUser = new ResponseUserDto(response);

      return {
        user: UserEntity.fromObject(newUser.showPublicUserData()),
        token: token,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}}`);
    }
  }
}
