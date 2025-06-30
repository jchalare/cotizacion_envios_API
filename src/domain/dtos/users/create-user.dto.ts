import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { regularExps } from "../../../config";

// DTO para crear un usuario (lo que esperamos recibir en un POST)
export class CreateUserDto {
  @IsNotEmpty({ message: "El nombre no puede estar vacío." })
  @IsString({ message: "El nombre debe ser una cadena de texto." })
  @MinLength(3, { message: "El nombre debe tener al menos 3 caracteres." })
  @MaxLength(50, { message: "El nombre no puede exceder los 50 caracteres." })
  nombre!: string;

  @IsNotEmpty({ message: "El apellido no puede estar vacío." })
  @IsString({ message: "El apellido debe ser una cadena de texto." })
  @MinLength(3, { message: "El apellido debe tener al menos 3 caracteres." })
  @MaxLength(50, { message: "El apellido no puede exceder los 50 caracteres." })
  apellido!: string;

  @IsNotEmpty({ message: "El número de teléfono no puede estar vacío." })
  @IsString({ message: "El número de teléfono debe ser una cadena de texto." })
  @MinLength(8, {
    message: "El número de teléfono debe tener al menos 8 caracteres.",
  })
  numeroTelefono!: string;

  @IsNotEmpty({ message: "El número de identificación no puede estar vacío." })
  @IsString({
    message: "El número de identificación debe ser una cadena de texto.",
  })
  @MinLength(5, {
    message: "El número de identificación debe tener al menos 5 caracteres.",
  })
  @MaxLength(20, {
    message: "El número de identificación no puede exceder los 20 caracteres.",
  })
  numeroIdentificacion!: string;

  @IsNotEmpty({ message: "El correo electrónico no puede estar vacío." })
  @IsEmail({}, { message: "El correo electrónico debe ser válido." })
  email!: string;

  @IsNotEmpty({ message: "La contraseña no puede estar vacía." })
  @IsString({ message: "La contraseña debe ser una cadena de texto." })
  @Matches(regularExps.password, {
    message:
      "La contraseña debe  al menos 8 caracteres, al menos un número y al menos una letra.",
  })
  password!: string;
}
