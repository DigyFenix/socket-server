import ResultDb from '../ResultDb';
import mysql = require('mysql');

export default class MysqlDb {

    private config: {
        host: string,
        user: string,
        password: string,
        database: string
    };
    private response: ResultDb = {};

    constructor(usuario: string, password: string) {
        this.config = {
            host: '' + process.env.MYSQL_HOST,
            user: usuario,
            password: password,
            database: '' + process.env.MYSQL_DB
        };
    }


    public procesarQuery = async (sql: string) => {
        return new Promise<ResultDb>((rs, rj) => {
            let conn = mysql.createConnection(this.config);
            conn.query(sql, (error: any, results, fields) => {
                if (error) {
                    this.response.error = { code: error['code'], sqlMessage: error['sqlMessage'], errno: error['errno'] };
                }
                if (results) {
                    this.response.data = results;
                }
                rs(this.response);
            });
        });
    }


    public procesarInsert = async (tabla: string, data: {}, idGenerado?: string) => {
        if (idGenerado) {
            //1ro Valido que la tabla y el idgenerado sean correctos 
            let sql = 'select * from ' + tabla + ' where ' + idGenerado + '=';
            let sqlPrueba = sql + 0;
            let datapost = await this.procesarQuery(sqlPrueba).then(dt => dt);
            if (datapost.error) {
                return datapost;
            }

            //2do Proceso el insert y si hay algun error, devuelo el error
            let dataInsert = await this.insertHelper(tabla, data);
            if (dataInsert.error) {
                return dataInsert
            }

            //3ro. Si el insert fue correcto obtengo el registro insertado y lo retorno
            let sqlPost = sql + dataInsert.data.insertId;
            return await this.procesarQuery(sqlPost).then(dt => dt);
        } else {
            return await this.insertHelper(tabla, data);
        }

    }

    public insertHelper = async (tabla: string, data: {}) => {
        return new Promise<ResultDb>((rs, rj) => {
            let conn = mysql.createConnection(this.config);
            conn.query('INSERT INTO ' + tabla + ' SET ?', data, (error: any, results, fields) => {
                if (error) {
                    this.response.error = { code: error['code'], sqlMessage: error['sqlMessage'], errno: error['errno'] };
                }
                if (results) {
                    this.response.data = { insertId: results.insertId };
                }
                rs(this.response);
            });
        });
    }

}