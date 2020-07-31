import { Response, Request } from "express";
import { HttpCodes } from "../../server/httpCodes";
import ResponseServer from '../../server/response';
import MysqlDb from '../../DB/MySql/mysqlDb';
import EjemploDal from './EjemploDal';
import Usuario from './BE/Usuario';

export default class EjemploBll {

  public static getUsuarios = async (req: Request, res: Response) => {
    //El usuarios y password viene validado por el Auth
    const { usuario, password } = req.headers;

    let data = await EjemploDal.getUsuarios('' + usuario, '' + password);
    return res
      .status(ResponseServer.getResponseCode(data))
      .json(
        ResponseServer.getResponse(data)
      );
  }

  public static postUsuario = async (req: Request, res: Response) => {
    //El usuarios y password viene validado por el Auth
    const { usuario, password } = req.headers;

    const { usuario: usuarioBody } = req.body;
    if (!usuarioBody) {
      return res
        .status(HttpCodes.OK)
        .json(
          ResponseServer.getError('No se ha recibido el usuario')
        );
    }

    let user = Usuario.getInstance(usuarioBody);

    if (!user) {
      return res
        .status(HttpCodes.OK)
        .json(
          ResponseServer.getError('Datos incorrectos')
        );
    }

    let data = await EjemploDal.postUsuario('' + usuario, '' + password, user);
    let httpStatus = HttpCodes.CREATED;

    if (data.error) {
      httpStatus = HttpCodes.OK
    }

    return res
      .status(httpStatus)
      .json(
        ResponseServer.getResponse(data)
      );

  }

  public static async ejemplo(req: Request, res: Response) {

    //usuario y clave vienen validados por el midelware de seguridad (JWT)
    // const { usuario, password } = req.headers;
    // console.log(usuario, password);

    // -------ORACLE 
    // let oracle = new OracleDb('' + usuario, '' + password);
    // let sql = ` select * from view_meses where mes =:1 or mes = :2 `;
    // let data = await oracle.procesarQuery(sql, [4, 6]);



    // Mysql SELECT
    // let mysql = new MysqlDb('' + usuario, '' + password);
    // let sql = 'select * from usuario';
    // let data = await mysql.procesarQuery(sql).then(dt => dt);
    // --Mysql INSERT
    // let mysql = new MysqlDb('' + usuario, '' + password);
    // let tabla = 'usuario';
    // let insertData = { nombre: 'Edwin Leonidas', apellido: "Chacon Garcia" };
    // let data = await mysql.procesarInsert(tabla, insertData, 'idusuario');

  }
}
