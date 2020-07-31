import oracledb, { autoCommit } from 'oracledb';
import ResultDb from '../ResultDb';

export default class OracleDb {

    //ORACLE_STR_QA:(DESCRIPTION =(ADDRESS_LIST =(ADDRESS =(COMMUNITY = tcp.world)(PROTOCOL = TCP)(Host = srvqa02.ipg.com.gt)(Port = 1521)))(CONNECT_DATA = (SID = dbprodpi)))
    //ORACLE_STR_PRODUCCION:(DESCRIPTION =(ADDRESS_LIST =(ADDRESS =(COMMUNITY = tcp.world)(PROTOCOL = TCP)(Host = srvdbpl01.ipg.com.gt)(Port = 1521)))(CONNECT_DATA = (SID = dbprodpi)))
    //ORACLE_STR_DESARROLLO:(DESCRIPTION =(ADDRESS_LIST =(ADDRESS =(COMMUNITY = tcp.world)(PROTOCOL = TCP)(Host = 198.200.1.201)(Port = 1521)))(CONNECT_DATA = (SID = dbprodpi)))

    //process.env.ORACLE_STR_QA
    //process.env.ORACLE_STR_PRODUCCION
    //process.env.ORACLE_STR_DESARROLLO

    private config: ConfigDbOracle;
    private response: ResultDb = {};

    constructor(usuario: string, password: string) {
        this.config = {
            user: usuario,
            password: password,
            connectString: '' + process.env.ORACLE_STR_QA
        }
    }


    public procesarInsertSimple = async (sql: string, binds: any[], commit: boolean) => {
        let options = {
            autoCommit: commit
        };
        let conn;
        try {
            conn = await oracledb.getConnection(this.config);
            this.response.data = await conn.execute(sql, binds, options);
        } catch (err) {
            this.response.error = '' + err;
        } finally {
            if (conn) {
                try {
                    await conn.close();
                } catch (err) {
                    console.error('OracleDb>procesarInsertSimple|Error al intentar cerrar la conexion' + err);
                }
            }
        }
        return this.response;
    }

    public procesarInsertMultiple = async (sql: string, binds: any[][]) => {
        let options = {
            autoCommit: false
        };
        let conn;
        try {
            conn = await oracledb.getConnection(this.config);
            this.response.data = await conn.executeMany(sql, binds, options);
            conn.commit();
        } catch (err) {
            this.response.error = '' + err;
        } finally {
            if (conn) {
                try {
                    await conn.close();
                } catch (err) {
                    console.error('OracleDb>procesarInsertMultiple|Error al intentar cerrar la conexion' + err);
                }
            }
        }
        return this.response;
    }

    public procesarDDL = async (statements: string[]) => {
        let result: [string, boolean][] = [];
        let conn;
        try {
            conn = await oracledb.getConnection(this.config);
            for (const s of statements) {
                try {
                    await conn.execute(s);
                    let temp: [string, boolean] = [s, true];
                    result.push(temp);
                } catch (e) {
                    let temp: [string, boolean] = [e, false];
                    result.push(temp);
                }
            }
            this.response.data = result;
        } catch (err) {
            this.response.error = '' + err;
        } finally {
            if (conn) {
                try {
                    await conn.close();
                } catch (err) {
                    console.error('OracleDb>procesarDDL|Error al intentar cerrar la conexion' + err);
                }
            }
        }
        return this.response;
    }

    public procesarQuery = async (sql: string, binds: any = []) => {

        let options = {
            outFormat: oracledb.OUT_FORMAT_OBJECT
        };

        let conn;
        try {
            conn = await oracledb.getConnection(this.config);
            this.response.data = await conn.execute(sql, binds, options);
        } catch (err) {
            this.response.error = '' + err;
        } finally {
            if (conn) {
                try {
                    await conn.close();
                } catch (err) {
                    console.error('OracleDb>procesarQuery|Error al intentar cerrar la conexion' + err);
                }
            }
        }
        return this.response;

    }

}


interface ConfigDbOracle {
    user: string,
    password: string,
    connectString: string
}