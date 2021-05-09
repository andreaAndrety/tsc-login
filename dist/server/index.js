"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var routes_1 = __importDefault(require("../routes/routes"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
require('dotenv').config();
var app = express_1.default();
//constantes
var PASS = process.env.PASS;
var USER = process.env.USER;
var DB_NAME = process.env.DB_NAME;
// console.log(PASS)
// console.log(USER)
// console.log(DB_NAME)
var middleware_1 = __importDefault(require("aws-serverless-express/middleware"));
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(middleware_1.default.eventContext());
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
//Routes
app.use(routes_1.default);
var url = "mongodb+srv://" + USER + ":" + PASS + "@cluster0.dprot.mongodb.net/" + DB_NAME + "?retryWrites=true&w=majority";
mongoose_1.default.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(function () { return console.log("bd conectada"); })
    .catch(function (e) { return console.log("error en conexion", e); });
module.exports = app;
