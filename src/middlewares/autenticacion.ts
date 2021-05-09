const jwt = require('jsonwebtoken');
import {Request ,Response,NextFunction} from 'express'
import { JsonWebTokenError } from 'jsonwebtoken';

//vamos a verificar el token conla ayuda de middelwares

let verificaToken = (req:Request, res:Response, next:NextFunction) => {
    let token = req.get('Authorization');
    //se recuerda que no se hace este next la aplicacion 
    //nunca va a continuar ejecutando
    jwt.verify(token, process.env.SEMILLA, (err:JsonWebTokenError, decoded:JsonWebKey) => {
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

export default verificaToken;
