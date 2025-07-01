import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class GetShipmentDto {
  @IsString()
  @IsNotEmpty({ message: "La guia no puede estar vacía." })
  guia!: string;

  @IsOptional()
  idUsuario?: number | null;
}
