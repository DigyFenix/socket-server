import Server from '../server/server';
import bodyParser from "body-parser";
import cors from "cors";
import MongoDb from '../DB/Mongo/mongoDb';
import OracleDb from '../DB/Oracle/oracleDb';

export default class Config {
    private static _instance: Config;
    private server = Server.instance;

    private constructor() {
        this.bodyParser();
        this.cors();
        this.mongoDb();
        this.router();
    }

    public static start() {
        if (!this._instance) this._instance = new this();
    }

    private bodyParser() {
        this.server.app.use(bodyParser.urlencoded({ extended: true }));
        this.server.app.use(bodyParser.json());
    }

    private cors() {
        this.server.app.use(cors({ origin: true, credentials: true }));
    }

    private mongoDb() {
        MongoDb.getInstance();
    }

    private router() {
        require('../server/router');
    }

   
}