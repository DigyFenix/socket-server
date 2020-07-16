import Server from '../clases/server';
import ejemploRoutes from './ejemplo.routes';

const server = Server.instance;

/**
 * Creo las rutas segun cada api
 */

 //ApiEjemplo
server.app.use('/', ejemploRoutes)


