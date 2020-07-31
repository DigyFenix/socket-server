
import { config as dotenv } from "dotenv";
import Server from './server/server';

//Enviroment
dotenv();

//Obtengo la instancia del server
const server = Server.instance;

//Inicio el server
server.start(() => {
  console.log(`Servidor iniciado en el puerto ${server.port}`);
});


