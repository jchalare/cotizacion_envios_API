export class ShipmentEntity {
  public id: number;
  public peso: number;
  public alto: number;
  public ancho: number;
  public largo: number;
  public idCiudadOrigen: number;
  public idCiudadDestino: number;
  public idUsuario?: number;
  public guia?: number;
  public precioCotizacion?: number;

  constructor(
    id: number,
    peso: number,
    alto: number,
    ancho: number,
    largo: number,
    idCiudadOrigen: number,
    idCiudadDestino: number,
    idUsuario?: number,
    guia?: number,
    precioCotizacion?: number
  ) {
    this.id = id;
    this.peso = peso;
    this.alto = alto;
    this.ancho = ancho;
    this.largo = largo;
    this.idCiudadOrigen = idCiudadOrigen;
    this.idCiudadDestino = idCiudadDestino;
    this.idUsuario = idUsuario;
    this.guia = guia;
    this.precioCotizacion = precioCotizacion;
  }

  public static fromObject(object: { [key: string]: any }): ShipmentEntity {
    const {
      id,
      peso,
      alto,
      ancho,
      largo,
      idCiudadOrigen,
      idCiudadDestino,
      idUsuario,
      guia,
      precioCotizacion,
    } = object;

    if (!id) throw "Id es requerido";
    if (!peso) throw "peso es requerido";
    if (!alto) throw "alto es requerido";
    if (!ancho) throw "ancho es requerido";
    if (!largo) throw "largo es requerido";
    if (!idCiudadOrigen) throw "La ciudad origen es requerida";
    if (!idCiudadDestino) throw "La ciudad destino es requerida";
    //if (!idUsuario) throw "El usuario es requerido";

    return new ShipmentEntity(
      id,
      peso,
      alto,
      ancho,
      largo,
      idCiudadOrigen,
      idCiudadDestino,
      idUsuario,
      guia,
      precioCotizacion
    );
  }
}
