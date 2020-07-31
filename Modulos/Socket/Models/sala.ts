import Usuario from "./usuario";

export default class Sala {
  public idSala: string;
  public nombre: string;
  private usuarios: Usuario[] = [];

  constructor(idSala: string, nombre: string) {
    this.idSala = idSala;
    this.nombre = nombre;
  }

  public agregarUsuario(usuario: Usuario) {
    this.usuarios.push(usuario);
  }

  public eliminarUsuario(socketID: string) {
    this.usuarios = this.usuarios.filter((u) => socketID !== u.socketId);
  }

  public getUsuarios() {
    return this.usuarios;
  }

  public existeUsuario(socketID: string) {
    let user = this.usuarios.find((u) => u.socketId === socketID);
    return user ? true : false;
  }
}
