"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../services/index");
const index_2 = require("../utils/index");
class UserController {
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.query.user_id;
                const name = req.query.name;
                let result;
                if (user_id) {
                    result = yield index_1.userService.checkUserExist("user_id", user_id);
                    if (result.error)
                        throw new Error(result.error);
                }
                else if (name) {
                    result = yield index_1.userService.checkUserExist("name", index_2.helperFunctions.lowerCaseStrings(name));
                    if (result.error)
                        throw new Error(result.error);
                }
                else {
                    result = yield index_1.userService.getAllUsers();
                    if (result.error)
                        throw new Error(result.error);
                }
                res.status(200);
                res.send(result);
            }
            catch (e) {
                console.log(e.message);
                res.status(404);
                res.send({ error: e.message });
            }
        });
    }
    postUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin_key = req.body.admin_key;
                let name = req.body.name;
                let email = req.body.email;
                let title = req.body.title;
                let date_of_birth = req.body.date_of_birth;
                if (!admin_key) {
                    throw new Error(index_2.Errors.ADMIN_KEY_REQUIRED);
                }
                const admin = yield index_1.userService.checkUserExist("admin_key", admin_key);
                if (admin.error === index_2.Errors.INTERNAL_ERROR) {
                    throw new Error(admin.error);
                }
                if (admin.error) {
                    throw new Error(index_2.Errors.ADMIN_NOT_FOUND);
                }
                name = name.toLowerCase();
                const user = yield index_1.userService.checkUserExist("name", name);
                if (user.error === index_2.Errors.INTERNAL_ERROR) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (user.user_id) {
                    throw new Error(index_2.Errors.DUPLICATE_USER_NAME);
                }
                let result;
                let user_info = { name, email, title, date_of_birth };
                result = yield index_1.userService.addUser(user_info);
                if (result.error)
                    throw new Error(result.error);
                res.setHeader("user_id", result.user_id);
                res.setHeader("name", result.name);
                res.status(201);
                next();
            }
            catch (e) {
                console.log(e.message);
                res.status(400);
                res.send({ error: e.message });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin_key = req.body.admin_key;
                const user_id = req.body.user_id;
                if (!admin_key) {
                    throw new Error(index_2.Errors.ADMIN_KEY_REQUIRED);
                }
                if (!user_id) {
                    throw new Error(index_2.Errors.USER_ID_REQUIRED);
                }
                const admin = yield index_1.userService.checkUserExist("admin_key", admin_key);
                if (admin.error) {
                    throw new Error(admin.error);
                }
                const user = yield index_1.userService.checkUserExist("user_id", user_id);
                if (user.error) {
                    throw new Error(user.error);
                }
                if (user.admin_key) {
                    throw new Error(index_2.Errors.ADMIN_DELETE_ADMIN);
                }
                const result = yield index_1.userService.removeUser({ user_id });
                if (result.error) {
                    throw new Error(result.error);
                }
                res.status(200);
                res.send(result);
            }
            catch (e) {
                console.log(e.message);
                res.status(400);
                res.send({ error: e.message });
            }
        });
    }
}
exports.default = UserController;
