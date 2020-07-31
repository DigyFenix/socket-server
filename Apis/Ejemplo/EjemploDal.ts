import MysqlDb from '../../DB/MySql/mysqlDb';
import Usuario from './BE/Usuario';

export default class EjemploDal {

    public static getUsuarios = async (usuario: string, password: string) => {
        let mysql = new MysqlDb(usuario, password);
        let sql = 'select * from usuario';
        let data = await mysql.procesarQuery(sql).then(dt => dt);
        return data;
    }

    public static postUsuario = async (usuario: string, password: string, usuarioDb: Usuario) => {
        let mysql = new MysqlDb(usuario, password);
        let tabla = 'usuario';
        let data = await mysql.procesarInsert(tabla, JSON.parse(JSON.stringify(usuarioDb)), 'idusuario');
        return data;
    }
}