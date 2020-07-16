import { Socket } from "socket.io";
import socketIO from 'socket.io';

export const desconectar = (cliente:Socket)=>{

    cliente.on('disconnect',()=>{
        console.log('Cliente desconectado');
    });

};


export const mensaje = (cliente:Socket, io:socketIO.Server)=>{
    cliente.on('mensaje', (payload:{de:string, mensaje:string})=>{
        console.log(`Mensaje recibido de ${payload.de}: ${payload.mensaje}`);

        io.emit('mensaje-nuevo', payload);

    });
};