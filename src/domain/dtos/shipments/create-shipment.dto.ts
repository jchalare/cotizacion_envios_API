import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

export class CreateShipmentDto {
  @IsNotEmpty({ message: "El articulo no puede estar vacío." })
  @IsString()
  articulo!: string;

  @IsNotEmpty({ message: "El peso no puede estar vacío." })
  @IsNumber()
  @Min(1, { message: "El peso debe ser mayor a 0." })
  peso!: number;

  @IsNotEmpty({ message: "El alto no puede estar vacío." })
  @IsNumber()
  @Min(1, { message: "El alto debe ser mayor a 0." })
  alto!: number;

  @IsNotEmpty({ message: "El ancho no puede estar vacío." })
  @IsNumber()
  @Min(1, { message: "El ancho debe ser mayor a 0." })
  ancho!: number;

  @IsNotEmpty({ message: "El largo no puede estar vacío." })
  @IsNumber()
  @Min(1, { message: "El largo debe ser mayor a 0." })
  largo!: number;

  @IsNotEmpty({ message: "La ciudad de origen no puede estar vacía. fffff" })
  @IsNumber()
  idCiudadOrigen!: number;

  @IsNotEmpty({ message: "La ciudad de destino no puede estar vacía." })
  @IsNumber()
  idCiudadDestino!: number;

  @IsNumber()
  @IsOptional()
  idUsuario?: number | null;

  @IsNumber()
  @IsOptional()
  precioCotizacion?: number | null;

  @IsString()
  @IsOptional()
  guia?: string | null;
}
