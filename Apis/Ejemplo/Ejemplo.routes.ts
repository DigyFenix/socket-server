import { Router, Request, Response } from "express";
import EjemploBll from "./EjemploBll";
import { validarToken } from "../../Auth/Local/jwtController";

const ejemploRoutes = Router();

ejemploRoutes.route("/usuario")
  .get([validarToken], (req: Request, rs: Response) => {
    EjemploBll.getUsuarios(req, rs);
  })
  .post([validarToken], (req: Request, rs: Response) => {
    EjemploBll.postUsuario(req, rs);
  });


export default ejemploRoutes;
