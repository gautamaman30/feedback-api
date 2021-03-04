"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: path_1.join(process.cwd(), `${process.env.NODE_ENV}.env`)
});
const configObj = {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    JWT_TOKEN_ISSUER: process.env.JWT_TOKEN_ISSUER,
    JWT_TOKEN_EXPIRES_IN: process.env.JWT_TOKEN_EXPIRES_IN,
    JWT_TOKEN_ALGORITHM: process.env.JWT_TOKEN_ALGORITHM,
    DB_URL: process.env.DB_URL,
    DB_NAME: process.env.DB_NAME
};
exports.default = configObj;
