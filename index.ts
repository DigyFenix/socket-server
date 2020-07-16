import Server from "./clases/server";

import bodyParser from "body-parser";
import cors from "cors";

const server = Server.instance

//BodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());

//CORS
server.app.use(cors({ origin: true, credentials: true }));

//Cargo las rutas
require('./routes/router');

//Inicio el server
server.start(() => {
  console.log(`Servidor iniciado en el puerto ${server.port}`);
});
