import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from "class-validator";
import { regularExps } from "../../../config";

export class LoginUserDto {
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

  @IsNotEmpty({ message: "La contraseña no puede estar vacía." })
  password!: string;
}
