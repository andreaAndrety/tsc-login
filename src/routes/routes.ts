import { Router,Request,Response } from "express";
import { register,login,restaurantes } from '../controllers/user.controller';
import verificaToken from '../middlewares/autenticacion'


const router =Router();
//router.get('/user',register);

router.post('/register',register);

router.post('/login',login);

router.post('/ciudad',verificaToken,restaurantes);


export default router;
