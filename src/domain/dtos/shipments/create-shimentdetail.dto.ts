import { IsIn, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateShipmentDetailDto {
  @IsNotEmpty({ message: "El Envio no puede estar vacío." })
  @IsNumber()
  idEnvio!: number;

  @IsNotEmpty({ message: "El numero de item detalle no puede estar vacío." })
  @IsNumber()
  item!: number;

  @IsNotEmpty({ message: "El estado no puede estar vacío." })
  @IsString()
  @IsIn(["En espera", "En transito", "Entregado"], {
    message: "El estado debe ser 'En espera', 'En transito' o 'Entregado'.",
  })
  estado!: string;

  @IsNotEmpty({ message: "La descripcion no puede estar vacía." })
  @IsString()
  @Min(1, { message: "La descripcion debe tener al menos 1 caracter." })
  descripcion!: string;
}
