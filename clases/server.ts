import express from 'express';
import { SERVER_PORT } from '../global/enviroment';
import  socketIO  from "socket.io";
import http from 'http';    
import * as socket from '../socket/socket'

export default class Server {
    public app: express.Application;
    public port: number;
    private static _instance: Server;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io = socketIO(this.httpServer);
        this.escucharSockets();
    }

    //Singleton para la clase senver
    public static get instance(){
        return this._instance || (this._instance =  new this())
    }


    private escucharSockets(){
        console.log('Servidor escuchando conexiones..');
        
        this.io.on('connection', cliente =>{
            console.log('Cliente conectado');   

            
            //Mensaje
            socket.mensaje(cliente, this.io);

            //desconectar
            socket.desconectar(cliente);

        });
    };

    start(callback : VoidFunction){
        this.httpServer.listen(this.port, callback);
    }
}