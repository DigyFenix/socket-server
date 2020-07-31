import Usuario from "./usuario";

export class UsuariosSocketCotroller {
  private lista: Usuario[] = [];

  public agregarUsuario(usuario: Usuario) {
    this.lista.push(usuario);
  }

  public borrarUsuario(socketId: string): Usuario {
    const tempUsuer = this.getUsuario(socketId);
    this.lista = this.lista.filter((user) => user.socketId !== socketId);
    return tempUsuer;
  }

  public getLista(): Usuario[] {
    return this.lista;
  }

  public getUsuario(socketId: string): Usuario {
    return <Usuario>this.lista.find((usuario) => usuario.socketId === socketId);
  }

}
