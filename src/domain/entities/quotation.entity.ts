export class QuotationEntity {
  public id: number;
  public precio: number;

  constructor(id: number, precio: number) {
    this.id = id;
    this.precio = precio;
  }

  public static fromObject(object: { [key: string]: any }): QuotationEntity {
    const { id, precio } = object;

    if (!id) throw "Id es requerido";
    if (!precio) throw "precio es requerido";

    return new QuotationEntity(id, precio);
  }
}
