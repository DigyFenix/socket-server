import socketIO from "socket.io";
import { SocketEvents } from "./socketEvents";
import { UsuariosSocketCotroller } from "./Models/usuariosSocketController";
import Sala from "./Models/sala";
import Usuario from "./Models/usuario";
import ResponseServer from "../../server/response";
import SalasSocketController from "./Models/salasSocketController";

export default class SocketController {
  public static _instance: SocketController;
  public io: socketIO.Server;
  public usuarios: UsuariosSocketCotroller;
  public salas: SalasSocketController;

  public constructor(io: socketIO.Server) {
    this.io = io;
    this.usuarios = new UsuariosSocketCotroller();
    this.salas = new SalasSocketController();
  }

  //Singleton para crear la intancia de la class SocketController
  public static instance(io: socketIO.Server) {
    return this._instance || (this._instance = new this(io));
  }

  //Getter para obtener la instancia
  public static getInstance() {
    return this._instance;
  }

  //========================================================================   Utilidades
  private emitirATodos(evento: SocketEvents, payload?: any) {
    this.io.emit(evento, payload);
  }

  private emitirACliente(
    clientId: string,
    evento: SocketEvents,
    payload?: any
  ) {
    this.io.to(clientId).emit(evento, payload);
  }

  private emitirASala(salaId: string, evento: SocketEvents, payload?: any) {
    this.io.in(salaId).emit(evento, payload);
  }

  //========================================================================   Implementacion de los enventos
  public desconectar = (socketId: string) => {
    this.usuarios.borrarUsuario(socketId);
    this.salas.eliminarUsuario(socketId);
    this.emitirATodos(
      SocketEvents.USUARIOS_CONECTADOS,
      this.usuarios.getLista()
    );
  };

  public configurarUsuario = (usuario: Usuario, callback: Function) => {
    this.usuarios.agregarUsuario(usuario);
    this.emitirATodos(
      SocketEvents.USUARIOS_CONECTADOS,
      this.usuarios.getLista()
    );

    callback(ResponseServer.getOk(`Usuarios ${usuario.nombre} configurado`));
  };

  public getUsuariosConectados = (clientid: string) => {
    this.emitirACliente(
      clientid,
      SocketEvents.USUARIOS_CONECTADOS,
      this.usuarios.getLista()
    );
  };

  public agregarUsuarioSala(sala: Sala, usuario: Usuario) {
    this.salas.getSala(sala.idSala).agregarUsuario(usuario);
  }

  public enviarATodos(payload: any) {
    this.emitirATodos(SocketEvents.MENSAJE_TODOS, payload);
  }
}
