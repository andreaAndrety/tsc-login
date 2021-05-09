
import mongoose from 'mongoose';
import Router from "../routes/routes";
import express from 'express';
import cors from 'cors';

require('dotenv').config();

const app=express();



//constantes
const PASS = process.env.PASS;
const USER = process.env.USER;
const DB_NAME = process.env.DB_NAME;

// console.log(PASS)
// console.log(USER)
// console.log(DB_NAME)

import awsServerlessExpressMidleware from 'aws-serverless-express/middleware';


app.use(cors());
app.use(express.json());
app.use(awsServerlessExpressMidleware.eventContext());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Routes
app.use(Router)


let url:string=`mongodb+srv://${USER}:${PASS}@cluster0.dprot.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }).then(() => console.log("bd conectada"))
    .catch(e => console.log("error en conexion", e))


module.exports= app;


