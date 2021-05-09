"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var aws_serverless_express_1 = __importDefault(require("aws-serverless-express"));
//const awsServerlessExpress = require('aws-serverless-express')
var app = require('./server/index');
var server = aws_serverless_express_1.default.createServer(app);
exports.handler = function (event, context) { aws_serverless_express_1.default.proxy(server, event, context); };
