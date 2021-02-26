"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = exports.authMiddleware = void 0;
const authMiddleware_1 = require("./authMiddleware");
const validatorMiddleware_1 = require("./validatorMiddleware");
const authMiddleware = new authMiddleware_1.AuthMiddleware();
exports.authMiddleware = authMiddleware;
const validator = new validatorMiddleware_1.Validator();
exports.validator = validator;
