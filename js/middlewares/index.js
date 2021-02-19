"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
const index_1 = require("../utils/index");
class Middleware {
    signToken(req, res) {
        const file_path = path_1.default.join(process.cwd(), '/authKeys/id_rsa');
        const signOptions = {
            issuer: 'crownstack',
            expiresIn: '24h',
            algorithm: 'RS256'
        };
        index_1.readFile(file_path).then((key) => {
            jsonwebtoken_1.default.sign({ user_id: res.get("user_id") }, key, signOptions, function (err, result) {
                if (err) {
                    console.log(err);
                }
                if (result) {
                    console.log(result);
                    const obj = {
                        user_id: res.get("user_id"),
                        name: res.get("name"),
                        token: result
                    };
                    res.send(obj);
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.send({ error: "Internal error" });
        });
    }
    verifyToken(req, res, next) {
        if (req.body.admin_key) {
            return next();
        }
        const file_path = path_1.default.join(process.cwd(), '/authKeys/id_rsa.pub');
        let token;
        if (req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
        }
        index_1.readFile(file_path).then((key) => {
            jsonwebtoken_1.default.verify(token, key, function (err, result) {
                if (err) {
                    console.log(err);
                    res.status(401);
                    res.send({ error: "Authorization failed" });
                }
                if (result)
                    next();
            });
        }).catch(err => {
            console.log(err);
            res.status(500);
            res.send({ error: "Internal error" });
        });
    }
}
exports.Middleware = Middleware;
