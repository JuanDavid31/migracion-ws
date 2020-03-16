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
var Data = /** @class */ (function () {
    function Data(id) {
        this.id = id;
    }
    return Data;
}());
var DataElemento = /** @class */ (function (_super) {
    __extends(DataElemento, _super);
    function DataElemento(id, nombre) {
        var _this = _super.call(this, id) || this;
        _this.nombre = nombre;
        return _this;
    }
    return DataElemento;
}(Data));
exports.DataElemento = DataElemento;
var DataGrupo = /** @class */ (function (_super) {
    __extends(DataGrupo, _super);
    function DataGrupo(id, nombre, parent) {
        var _this = _super.call(this, id, nombre) || this;
        _this.esGrupo = false;
        _this.parent = parent;
        return _this;
    }
    return DataGrupo;
}(DataElemento));
exports.DataGrupo = DataGrupo;
var DataNodo = /** @class */ (function (_super) {
    __extends(DataNodo, _super);
    function DataNodo(id, nombre, urlFoto, nombreCreador, parent) {
        var _this = _super.call(this, id, nombre) || this;
        _this.urlFoto = urlFoto;
        _this.nombreCreador = nombreCreador;
        _this.parent = parent;
        return _this;
    }
    return DataNodo;
}(DataElemento));
exports.DataNodo = DataNodo;
var DataEdge = /** @class */ (function (_super) {
    __extends(DataEdge, _super);
    function DataEdge(id, source, target) {
        var _this = _super.call(this, id) || this;
        _this.source = source;
        _this.target = target;
        return _this;
    }
    return DataEdge;
}(Data));
exports.DataEdge = DataEdge;
