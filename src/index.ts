import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import awsServerlessExpress from 'aws-serverless-express'
//const awsServerlessExpress = require('aws-serverless-express')
const app = require('./server/index')
const server = awsServerlessExpress.createServer(app)

exports.handler = (event:APIGatewayProxyEvent, context:Context) => { awsServerlessExpress.proxy(server, event, context) }