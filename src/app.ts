import { Socket } from "socket.io";
import { Elemento } from "./classes/Elementos";
import { ContenedorSalas } from "./classes/ContenedorSalas";
import { darElementos } from "./usecase/FacadeUseCase";

let express = require('express');
let app = express();
let http = require('http');
let server = http.Server(app);
let socketIO = require('socket.io');
let io = socketIO(server);

class Cliente{
    nombre: string;
    email: string;
    solicitandoOrganizado = false;
    socket: Socket;

    constructor(nombre: string, email: string, socket: Socket) {
        this.nombre = nombre;
        this.email = email;
        this.socket = socket;
    }
}

class Sala{
    clientes: Cliente[];
    elementos: Elemento[];

    constructor(clientes: Cliente[], elementos: Elemento[]) {
        this.clientes = clientes;
        this.elementos = elementos;
    }
}

const ACCIONES = {
    agregarNuevoUsuario: "Conectarse",
    actualizarPosiciones: "Actualizar posiciones",//Esta acción no existe en el client
    agregarElemento: "Agregar elemento",
    moverElemento: "Mover elemento",
    eliminarElemento: "Eliminar elemento",
    bloquear: "Bloquear",
    desbloquera: "Desbloquear",
    mover: "Mover",
    moverPadre: "Mover padre",
    cambioSolicitudOrganizacion: "Cambio solicitud de organizacion",
    cambiarNombre: "Cambiar nombre",
}

const AccionesEnviables = {
    nodos: 'nodos'
};



const port = process.env.PORT || 3000;

const salasActivas: ContenedorSalas<Sala> = {};

io.on('connection', async (socket: Socket) => {

    const { idProblematica, nombre, email } = socket.handshake.query;
    const cliente = new Cliente(nombre, email, socket);

    if(!salasActivas[idProblematica]){
        const elementos = await darElementos(idProblematica);
        salasActivas[idProblematica] = new Sala([cliente], elementos);
    }else{
        salasActivas[idProblematica].clientes.push(cliente);
    }

    const { elementos, clientes } = salasActivas[idProblematica];
    const solicitantes = clientes.map(cliente => {
        delete cliente.socket;
        return cliente;
    });

    socket.emit(AccionesEnviables.nodos, JSON.stringify({nodos: elementos, solicitantes}));



    difundir(ACCIONES.agregarNuevoUsuario, idProblematica, JSON.stringify({nombre, email}), socket.id);




    socket.on(ACCIONES.agregarNuevoUsuario, agregarNuevoUsuario);
    socket.on('disconnect', onDisconnect);
    socket.on('saludo', (algo, algo1) => {
        console.log(algo, algo1);
        socket.emit('saludo', JSON.stringify({memes: 1}));
    })
});

const agregarNuevoUsuario = async (data: Socket, algo: any) => {
    console.log(data, algo);

};

const onDisconnect = async (socket: Socket, algo: any) => {
    console.log(socket, algo);
};

const difundir = (accion: string, idProblematica: string, mensaje: string, idSocket?: string) => {
    const { clientes } = salasActivas[idProblematica];
    clientes.map(cliente => cliente.socket)
        .filter(socket => socket.id !== idSocket)
        .forEach(socket => socket.emit(accion, mensaje));
}

server.listen(port, () => {
    console.log(`started on port: ${port}`);
});
