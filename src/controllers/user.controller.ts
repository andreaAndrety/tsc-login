import axios from 'axios';
import {Request ,Response} from 'express'
import jwt from 'jsonwebtoken';
import User,{IUser} from "../models/user";





export const register=async(req:Request,res:Response)=>{
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            ok:false,
            message:'el usuario y la contraseña con requeridos'
        })
    }

    const user = await User.findOne({email:req.body.email});

    if(user){
        return res.status(400).json({
            ok:false,
            message:'el usuario ya existe'
        })
    }
    try {
        const newUser = new User(req.body);
    await newUser.save()

    return res.status(500).json({
        ok:false,
        message:'el usuario se guardo correctamente'
        
    })

    } catch (error) {
        res.status(500).json({
            ok:false,
            message:'el usuario no se pudo guardar',
            error
        })
    }
}

export const login=async(req:Request,res:Response)=>{
    try {
    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            ok:false,
            message:'el usuario y la contraseña con requeridos'
        })
    }
    console.log(req.body)
    const user = await User.findOne({email:req.body.email});
    console.log(user)
    if(!user){
        return res.status(400).json({
            ok:false,
            message:'el usuario no existe'
        })
    }
    const semilla =process.env.SEMILLA || 'dev';

    
    console.log(semilla)
        
    const valida =await user.comparePasswordUser(req.body.password)
    console.log(valida)
    if(valida){
        console.log(valida)
        let token = jwt.sign({
            usuario: req.body.email
        }, semilla, { expiresIn: process.env.CADUCIDAD_TOKEN });

       return  res.status(200).json({
            ok:false,
            message:'el usuario se logueo correctamente',
            token:token
        })
    
    }

    res.status(501).json({
        ok:false,
        message:'el usuario no se pudo loguear usuario o contraseña invalido'
    })
    } catch (error) {
        res.status(500).json({
            ok:false,
            message:'ocurrio un error en el proceso',
            error
        })
    }


    
}

export const restaurantes=async(req:Request,res:Response)=>{
    try {
        const ciudad = req.body.ciudad
    
        const url=`https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${ciudad}`
        const instace = axios.create({
            baseURL: `https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=${ciudad}`,
            headers: { "x-rapidapi-key": "6492b5bee5msh65b77a80cfcdd15p147c2fjsn485a88047054" }
        });
    
    
        const resp = await instace.get(url);
    
        if (resp.data.Results.length === 0) {
            res.status(400).json({
                ok:false,
                message:'no existen registros',
            })
        } else {
            res.json({
                ok:true,
                message:'registros',
                resp
            })
        }   
    } catch (error) {
        res.json({
            ok:true,
            message:'error al procesar',
            error
        })
    }


    
}
