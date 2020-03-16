"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Data_1 = require("./Data");
var Elemento = /** @class */ (function () {
    function Elemento(data) {
        this.data = data;
    }
    return Elemento;
}());
exports.Elemento = Elemento;
var Grupo = /** @class */ (function (_super) {
    __extends(Grupo, _super);
    function Grupo(id, nombre, parent) {
        var _this = this;
        var data = new Data_1.DataGrupo(id, nombre, parent);
        _this = _super.call(this, data) || this;
        _this.data = data;
        return _this;
    }
    return Grupo;
}(Elemento));
exports.Grupo = Grupo;
var Nodo = /** @class */ (function (_super) {
    __extends(Nodo, _super);
    function Nodo(id, nombre, urlFoto, nombreCreador, parent) {
        var _this = this;
        var data = new Data_1.DataNodo(id, nombre, urlFoto, nombreCreador, parent);
        _this = _super.call(this, data) || this;
        _this.data = data;
        return _this;
    }
    return Nodo;
}(Elemento));
exports.Nodo = Nodo;
var Edge = /** @class */ (function (_super) {
    __extends(Edge, _super);
    function Edge(id, source, target) {
        var _this = _super.call(this, new Data_1.DataEdge(id, source, target)) || this;
        _this.data = new Data_1.DataEdge(id, source, target);
        return _this;
    }
    return Edge;
}(Elemento));
exports.Edge = Edge;
