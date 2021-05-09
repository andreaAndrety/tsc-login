"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var user_controller_1 = require("../controllers/user.controller");
var autenticacion_1 = __importDefault(require("../middlewares/autenticacion"));
var router = express_1.Router();
//router.get('/user',register);
router.post('/register', user_controller_1.register);
router.post('/login', user_controller_1.login);
router.post('/ciudad', autenticacion_1.default, user_controller_1.restaurantes);
exports.default = router;
