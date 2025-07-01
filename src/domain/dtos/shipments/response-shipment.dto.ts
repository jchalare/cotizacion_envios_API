//#################################
// Clase para formatear la respuesta del envio
//#################################

export class ResponseShipmentDto {
  id: number;
  articulo: string;
  peso: number;
  alto: number;
  ancho: number;
  largo: number;
  precioCotizacion: number;
  guia: number;
  idCiudadOrigen: number;
  idCiudadDestino: number;

  constructor(shipmentData: any) {
    this.id = shipmentData.id;
    this.articulo = shipmentData.articulo;
    this.peso = parseFloat(shipmentData.peso);
    this.alto = shipmentData.alto;
    this.ancho = shipmentData.ancho;
    this.largo = shipmentData.largo;
    this.precioCotizacion = parseFloat(shipmentData.precio_cotizacion);
    this.guia = shipmentData.guia;
    this.idCiudadOrigen = shipmentData.id_ciudad_origen;
    this.idCiudadDestino = shipmentData.id_ciudad_destino;
  }
}
