"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require('jsonwebtoken');
//vamos a verificar el token conla ayuda de middelwares
var verificaToken = function (req, res, next) {
    var token = req.get('Authorization');
    //se recuerda que no se hace este next la aplicacion 
    //nunca va a continuar ejecutando
    jwt.verify(token, process.env.SEMILLA, function (err, decoded) {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'token no valido'
                }
            });
        }
        next();
    });
    // res.json({
    //     token: token
    // });
};
exports.default = verificaToken;
