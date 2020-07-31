import Server from './server';
import ejemploRoutes from '../Apis/Ejemplo/Ejemplo.routes';
import loginRoutes from '../Apis/Login/Login.routes';

const server = Server.instance;

//Login
server.app.use('/', loginRoutes);

//Ejemplo
server.app.use('/', ejemploRoutes);
  

