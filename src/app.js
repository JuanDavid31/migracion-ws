"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var FacadeUseCase_1 = require("./usecase/FacadeUseCase");
var express = require('express');
var app = express();
var http = require('http');
var server = http.Server(app);
var socketIO = require('socket.io');
var io = socketIO(server);
var Cliente = /** @class */ (function () {
    function Cliente(nombre, email, socket) {
        this.solicitandoOrganizado = false;
        this.nombre = nombre;
        this.email = email;
        this.socket = socket;
    }
    return Cliente;
}());
var Sala = /** @class */ (function () {
    function Sala(clientes, elementos) {
        this.clientes = clientes;
        this.elementos = elementos;
    }
    return Sala;
}());
var ACCIONES = {
    agregarNuevoUsuario: "Conectarse",
    actualizarPosiciones: "Actualizar posiciones",
    agregarElemento: "Agregar elemento",
    moverElemento: "Mover elemento",
    eliminarElemento: "Eliminar elemento",
    bloquear: "Bloquear",
    desbloquera: "Desbloquear",
    mover: "Mover",
    moverPadre: "Mover padre",
    cambioSolicitudOrganizacion: "Cambio solicitud de organizacion",
    cambiarNombre: "Cambiar nombre"
};
var AccionesEnviables = {
    nodos: 'nodos'
};
var port = process.env.PORT || 3000;
var salasActivas = {};
io.on('connection', function (socket) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, idProblematica, nombre, email, cliente, elementos_1, _b, elementos, clientes, solicitantes;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = socket.handshake.query, idProblematica = _a.idProblematica, nombre = _a.nombre, email = _a.email;
                cliente = new Cliente(nombre, email, socket);
                if (!!salasActivas[idProblematica]) return [3 /*break*/, 2];
                return [4 /*yield*/, FacadeUseCase_1.darElementos(idProblematica)];
            case 1:
                elementos_1 = _c.sent();
                salasActivas[idProblematica] = new Sala([cliente], elementos_1);
                return [3 /*break*/, 3];
            case 2:
                salasActivas[idProblematica].clientes.push(cliente);
                _c.label = 3;
            case 3:
                _b = salasActivas[idProblematica], elementos = _b.elementos, clientes = _b.clientes;
                solicitantes = clientes.map(function (cliente) {
                    delete cliente.socket;
                    return cliente;
                });
                socket.emit(AccionesEnviables.nodos, JSON.stringify({ nodos: elementos, solicitantes: solicitantes }));
                difundir(ACCIONES.agregarNuevoUsuario, idProblematica, JSON.stringify({ nombre: nombre, email: email }), socket.id);
                socket.on(ACCIONES.agregarNuevoUsuario, agregarNuevoUsuario);
                socket.on('disconnect', onDisconnect);
                socket.on('saludo', function (algo, algo1) {
                    console.log(algo, algo1);
                    socket.emit('saludo', JSON.stringify({ memes: 1 }));
                });
                return [2 /*return*/];
        }
    });
}); });
var agregarNuevoUsuario = function (data, algo) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log(data, algo);
        return [2 /*return*/];
    });
}); };
var onDisconnect = function (socket, algo) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log(socket, algo);
        return [2 /*return*/];
    });
}); };
var difundir = function (accion, idProblematica, mensaje, idSocket) {
    var clientes = salasActivas[idProblematica].clientes;
    clientes.map(function (cliente) { return cliente.socket; })
        .filter(function (socket) { return socket.id !== idSocket; })
        .forEach(function (socket) { return socket.emit(accion, mensaje); });
};
server.listen(port, function () {
    console.log("started on port: " + port);
});
