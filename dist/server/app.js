"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Server = /** @class */ (function () {
    function Server(port) {
        this.port = port;
        this.app = express();
    }
    Server.init = function (port) {
        return new Server(port);
    };
    Server.prototype.start = function (callback) {
        this.app.listen(this.port, callback());
    };
    return Server;
}());
exports.default = Server;
