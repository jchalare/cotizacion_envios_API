//#################################
// Clase para formatear la respuesta del usuario
// que se envía al cliente después de crear o autenticar un usuario.
//#################################

export class ResponseUserDto {
  id: number;
  nombre: string;
  apellido: string;
  numeroTelefono: string;
  numeroIdentificacion: string;
  email: string;
  password?: string;

  constructor(userData: any) {
    this.id = userData.id;
    this.nombre = userData.nombre;
    this.apellido = userData.apellido;
    this.numeroTelefono = userData.numero_telefono;
    this.numeroIdentificacion = userData.numero_identificacion;
    this.email = userData.email;
    this.password = userData.password ? userData.password : "";
  }

  showPublicUserData() {
    const { password, ...data } = this;
    return data;
  }
}
