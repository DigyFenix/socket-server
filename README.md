#Socket Server

Servidor para implementar un api rest con sockets. 

El proyecto esta creado con typescript
`````
npm install -g typescript
`````

Se ejecuta en el framework de NodeJs 
https://nodejs.org/es/

Iniciar el proyecto: 
Instalar mongodb
Configurar el usuario de conexion a mongo db:

`````
Nos conectamos por consola
mongo

use jwt

db.createUser(
  {
    user: "usuario",
    pwd: "password", 
    roles: [
       { role: "readWrite", db: "jwt" }
    ]
  }
)

show users
`````

Configurar la autenticacion en mongodb: 
En el archivo cfg del bin

Busca la linea net y comenta la líneabindIp debajo de ella, la cual por defecto limita a MongoDB a conexiones locales:
`````
# network interfaces
net:
  port: 27017
#  bindIp: 127.0.0.1  <- comenta esta linea

Baja un poco más a la sección #security: y agrega la siguiente línea. Asegúrate de quitar el comentario a la línea security:
security:
  authorization: 'enabled'

Reiniciar el servicio de mongo
`````
Finalmente en el archivo .env configurar la cadena segun el usuario creado
`````
MONGO_DB=mongodb://usuario:password@localhost:27017/jwt
`````

Configurar el archivo .env segun los datos que corresponden. 

Reconstruir modulos de node
`````
npm install 
`````

Generar el dist
`````
tsc -w
`````

Iniciar el servidor
`````
npm run iniciar
`````

Para esta version se utiliza mysql por lo que se debe instalar mysql y crear los usuarios que se utilizaran. 

Luego de crear los usuarios en mysql ejecutamos la siguiente instruccion, para utilizar la autenticacion nativa.
ALTER USER 'usuario' IDENTIFIED WITH mysql_native_password BY 'password'

Tambien se incluye la clase para trabajar con oracle, para ello descargar los Oracle Instant CLient
https://www.oracle.com/database/technologies/instant-client/downloads.html
y crear la carpeta
C:\Oracle\instantclient_19_6

y luego agregar esa ruta al la variable de entorno PATH del sistema operativo. 

