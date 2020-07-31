import { Request, Response } from "express";
import ResponseServer from "../../server/response";
import { HttpCodes } from "../../server/httpCodes";
import { generarToken, JWTResponse } from '../../Auth/Local/jwtController';
import MysqlDb from '../../DB/MySql/mysqlDb';
import ResultDb from '../../DB/ResultDb';

export default class LoginBll {

  public static async login(req: Request, res: Response) {
    const { user, password } = req.body;
    const { host } = req.headers;
    if (!(user && password && host)) {
      return res
        .status(HttpCodes.OK)
        .json(ResponseServer.getError(" user, password son requeridos."));
    }

    let mysql = new MysqlDb('' + user, '' + password);
    let result: ResultDb = await mysql.procesarQuery('select 1 from dual').then(dt => dt);
    
    if (result.data) {
      let payload = {
        data: "DigyFenix S.A.",
        generado: new Date().getTime()
      };

      let token: JWTResponse = await generarToken(host, user, password, payload);
      if (!token.ok) {
        return res
          .status(HttpCodes.OK)
          .json(ResponseServer.getError("No se ha podido generar el token|" + token.data));
      }

      return res.json(ResponseServer.getOk(token.data));
    } else {
      return res
        .status(HttpCodes.OK)
        .json(ResponseServer.getResponse(result));
    }

  }
}
