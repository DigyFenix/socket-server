import socketIO, { Socket } from "socket.io";
import http from "http";
import { SocketEvents } from "./socketEvents";
import SocketController from "./socketController";
import Usuario from "./Models/usuario";

export default class SocketServer {
  private io: socketIO.Server;
  private static _instance: SocketServer;
  private sc: SocketController;

  //Esta clase no debe ser instanciada desde afuera
  private constructor(httpServer?: http.Server) {
    //Creo el servidor de socket
    this.io = socketIO(httpServer);

    //Obtengo la instancia del SocketController
    this.sc = SocketController.instance(this.io);

    //Escucho los eventos
    this.escucharEventos();
    
  }

  //Patron singleton, para crear una instancia unica
  public static instance(httpServer?: http.Server) {
    return this._instance || (this._instance = new this(httpServer));
  }

  private escucharEventos = () => {
    this.io.on(SocketEvents.CONNECTION, (cliente: Socket) => {
      //Eventos que escucha y emite el servidor

      //Cuando un usuarios se desconecta
      cliente.on(SocketEvents.DISCONNECT, () => {
        this.sc.desconectar(cliente.id);
      });

      //Cuando un usuario cierra sesion
      cliente.on(SocketEvents.DESCONECTAR_USUARIO, () => {
        this.sc.desconectar(cliente.id);
      });

      //Cuando un usuario inicia sesion
      cliente.on(
        SocketEvents.CONFIGURAR_USUARIO,
        (payload: Usuario, callback: Function) => {
          if (payload.email && payload.nombre) {
            let usuario = new Usuario(
              payload.email,
              payload.nombre,
              cliente.id
            );
            this.sc.configurarUsuario(usuario, callback);
          }
        }
      );

      //Cuando solicitan la lista de usuarios
      cliente.on(SocketEvents.USUARIOS_CONECTADOS, () => {
        this.sc.getUsuariosConectados(cliente.id);
      });

      //Mensaje a todos los usuarios conectados
      cliente.on(
        SocketEvents.MENSAJE_TODOS,
        (payload: { de: string; mensaje: string }) => {
          this.sc.enviarATodos(payload);
        }
      );
    });
  };
}
