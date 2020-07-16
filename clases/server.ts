import express from 'express';
import { SERVER_PORT } from '../global/enviroment';

export default class Server {
    public app: express.Application;
    public port: number;
    private static _instance: Server;

    private constructor(){
        this.app = express();
        this.port = SERVER_PORT;
    }

    //Singleton para la clase senver
    public static get instance(){
        return this._instance || (this._instance =  new this())
    }

    start(callback : VoidFunction){
        this.app.listen(this.port, callback);
    }
}