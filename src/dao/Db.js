"use strict";
exports.__esModule = true;
var pg_1 = require("pg");
var config = {
    host: 'localhost',
    user: 'postgres',
    password: '',
    database: 'library'
};
exports.pool = new pg_1.Pool(config);
