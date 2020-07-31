export default class Usuario {
  public email: string;
  public nombre: string;
  public socketId?: string;

  constructor(email: string, nombre: string, sockeID?:string) {
    this.email = email;
    this.nombre = nombre;
    this.socketId = sockeID;
  }
  
}
