import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { HttpCodes } from "../../server/httpCodes";
import ResponseServer from "../../server/response";
import JwtModel from "./JwtModel";

//Encription options
const options = {
  password: process.env.TOKEN_SEED || "SEED_DESARROLLO",
  passwordSalt: "10",
};
const encryption = require("encryption-se")(options);

export const validarToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { auth, host } = req.headers;
  if (!(auth && host)) {
    return res
      .status(HttpCodes.FORBIDDEN)
      .json(ResponseServer.getError("auth es requerido."));
  }

  //Obtengo el documento de la dbs mongo
  const jwtModelDB = await JwtModel.findOne({
    $and: [{ jwt: String(auth) }, { ip: String(host) }],
  });

  if (!jwtModelDB) {
    return res
      .status(HttpCodes.FORBIDDEN)
      .json(ResponseServer.getError("Token incorrecto"));
  }

  //Si el token es encontrado entonces obtengo las credenciales y las paso al header de la peticion
  req.headers.usuario = await desdecriptar(jwtModelDB.usuario);
  req.headers.password = await desdecriptar(jwtModelDB.password);

  next();
};

export interface JWTResponse {
  ok: boolean,
  data: string
}

export const generarToken = async (
  ip: string,
  usuario: string,
  password: string,
  payload: any
) => {
  let returnData: JWTResponse = {
    ok: true,
    data: ''
  };

  try {

    let usuarioEncriptado: string = "";
    let passwordEncriptado: string = "";

    await encriptar(usuario).then((result: string) => {
      usuarioEncriptado = result;
    });

    await encriptar(password).then((result: string) => {
      passwordEncriptado = result;
    });

    //=============== Implementacion de las validaciones para generar el token 

    //el usuario se ha autenticado
    if (returnData.ok) {
      let token = jwt.sign(payload, "" + process.env.TOKEN_SEED, {
        expiresIn: process.env.TOKEN_EXPIRE,
      });
      returnData.data = token;

      //Guardo el token en mongo
      let userdb = new JwtModel({
        jwt: token,
        usuario: usuarioEncriptado,
        password: passwordEncriptado,
        ip,
      });

      userdb.save();
    }

  } catch (error) {
    if (!returnData.data) returnData.data = '' + error;
  }
  return returnData;
};

let encriptar = (password: string) => {
  return encryption.encrypt(password);
};

let desdecriptar = async (password: string) => {
  return encryption.decrypt(password);
};
