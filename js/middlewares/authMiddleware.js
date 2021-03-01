"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../utils/index");
class AuthMiddleware {
    signToken(req, res, next) {
        const signOptions = {
            issuer: process.env.JWT_TOKEN_ISSUER,
            expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
            algorithm: process.env.JWT_TOKEN_ALGORITHM
        };
        const key = process.env.SECRET_KEY;
        let payload = JSON.parse(res.get("payload"));
        jsonwebtoken_1.default.sign(payload, key, signOptions, function (err, token) {
            if (err) {
                console.log(err);
                res.status(500);
                res.send({ error: index_1.Errors.INTERNAL_ERROR });
            }
            if (token) {
                console.log(token);
                if (res.get("password")) {
                    let password = res.get("password");
                    res.set("password", '');
                    res.send({ password, token });
                }
                res.send({ token });
            }
        });
    }
    verifyToken(req, res, next) {
        let token;
        if (req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
        }
        jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY, function (err, result) {
            if (err) {
                console.log(err);
                res.status(401);
                res.send({ error: index_1.Errors.AUTHORIZATION_FAILED });
            }
            if (result) {
                req.body.user_id = result.user_id;
                return next();
            }
        });
    }
    checkRequestKeys(req, res, next) {
        let body = req.body;
        for (let key in body) {
            req.body[key.toLowerCase()] = body[key];
        }
        return next();
    }
    checkUnknownRoutes(req, res) {
        res.status(404);
        res.send({ errors: index_1.Errors.BAD_REQUEST });
    }
}
exports.AuthMiddleware = AuthMiddleware;
