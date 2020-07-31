import express from "express";
import http from "http";
import SocketServer from "../Modulos/Socket/socketServer";
import Config from '../Config/config';
import { validarToken } from '../Auth/Local/jwtController';

export default class Server {
  public app: express.Application;
  public port: number;
  private static _instance: Server;
  private httpServer: http.Server;

  private constructor() {
    this.app = express();
    this.port = Number(process.env.SERVER_PORT) || 3000;
    this.httpServer = new http.Server(this.app);

    //Inicio los sockets
    SocketServer.instance(this.httpServer);

    //Sitio publico para acceder a las imagenes
    this.app.use("/public", express.static(__dirname + "/public"));

    //Instancia de la base de datos 
  }

  //Singleton para la clase server
  public static get instance() {
    if (!this._instance) {
      this._instance = new this();
      Config.start();
    }
    return this._instance;
  }

  //Inicio el server
  start(callback: VoidFunction) {
    this.httpServer.listen(this.port, callback);
  }
}
