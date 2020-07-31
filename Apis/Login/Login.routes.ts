import { Router, Request, Response } from "express";
import LoginBll from "./LoginBll";

const loginRoutes = Router();

loginRoutes.route("/login")
  .post((req: Request, rs: Response) => {
    LoginBll.login(req, rs);
  });

export default loginRoutes;

