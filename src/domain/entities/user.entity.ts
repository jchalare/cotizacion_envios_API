export class UserEntity {
  public id: number;
  public nombre: string;
  public apellido: string;
  public numeroTelefono: string;
  public numeroIdentificacion: string;
  public email: string;
  public password?: string;

  constructor(
    id: number,
    nombre: string,
    apellido: string,
    numeroTelefono: string,
    numeroIdentificacion: string,
    email: string,
    password: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.numeroTelefono = numeroTelefono;
    this.numeroIdentificacion = numeroIdentificacion;
    this.email = email;
    this.password = password;
  }

  public static fromObject(object: { [key: string]: any }): UserEntity {
    const {
      id,
      nombre,
      apellido,
      numeroTelefono,
      numeroIdentificacion,
      email,
      password,
    } = object;

    if (!id) throw "Id es requerido";
    if (!numeroIdentificacion) throw "numeroIdentificacion es requerido";
    if (!nombre) throw "nombre es requerido";
    if (!apellido) throw "apellido es requerido";
    if (!email) throw "email es requerido";
    if (!numeroTelefono) throw "numero de telefono es requerido";

    return new UserEntity(
      id,
      nombre,
      apellido,
      numeroTelefono,
      numeroIdentificacion,
      email,
      password
    );
  }

  public showPublicUserData() {
    const { password, ...data } = this;
    return data;
  }
}
