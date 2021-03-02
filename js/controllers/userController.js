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
                const email = req.query.email;
                let result;
                if (user_id) {
                    result = yield index_1.userService.checkUserExist("user_id", user_id);
                    if (result.error)
                        throw new Error(result.error);
                }
                else if (email) {
                    result = yield index_1.userService.checkUserExist("email", email);
                    if (result.error)
                        throw new Error(result.error);
                }
                else if (name) {
                    result = yield index_1.userService.getUsers("name", name);
                    if (result.error)
                        throw new Error(result.error);
                }
                else {
                    result = yield index_1.userService.getAllUsers();
                    if (result.error)
                        throw new Error(result.error);
                }
                result = index_2.helperFunctions.removeSensitiveData(result);
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
                const admin_id = req.body.user_id;
                let name = req.body.name;
                let email = req.body.email;
                let title = req.body.title;
                let date_of_birth = req.body.date_of_birth;
                const admin = yield index_1.userService.checkAdminExist("user_id", admin_id);
                if (admin.error) {
                    throw new Error(admin.error);
                }
                const user = yield index_1.userService.checkUserExist("email", email);
                if (user.error === index_2.Errors.INTERNAL_ERROR) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (user.user_id) {
                    throw new Error(index_2.Errors.DUPLICATE_EMAIL);
                }
                let user_info = { name, email, title, date_of_birth };
                let result = yield index_1.userService.addUser(user_info);
                if (result.error) {
                    throw new Error(result.error);
                }
                const payload = JSON.stringify({
                    user_id: result.user_id,
                    name: result.name,
                    email: result.email
                });
                res.set("payload", payload);
                res.status(201);
                return next();
            }
            catch (e) {
                console.log(e.message);
                res.status(400);
                res.send({ error: e.message });
            }
        });
    }
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let email = req.body.email;
                let password = req.body.password;
                const user = yield index_1.userService.checkUserExist("email", email);
                if (user.error) {
                    throw new Error(user.error);
                }
                const result = yield index_2.helperFunctions.comparePassword(password, user.password);
                if (result.error) {
                    throw new Error(result.error);
                }
                if (!result) {
                    throw new Error(index_2.Errors.USER_PASSWORD_INCORRECT);
                }
                const payload = JSON.stringify({
                    user_id: user.user_id,
                    name: user.name,
                    email: user.email
                });
                res.setHeader("payload", payload);
                res.status(200);
                return next();
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
                const admin_id = req.body.user_id;
                const email = req.body.email;
                const admin = yield index_1.userService.checkAdminExist("user_id", admin_id);
                if (admin.error) {
                    throw new Error(admin.error);
                }
                const user = yield index_1.userService.checkUserExist("email", email);
                if (user.error) {
                    throw new Error(user.error);
                }
                if (user.roles === "admin") {
                    throw new Error(index_2.Errors.ADMIN_DELETE_ADMIN);
                }
                const result = yield index_1.userService.removeUser({ email });
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
    updateUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user_id = req.body.user_id;
                let password = req.body.password;
                let title = req.body.title;
                let date_of_birth = req.body.date_of_birth;
                const user = yield index_1.userService.checkUserExist("user_id", user_id);
                if (user.error) {
                    throw new Error(user.error);
                }
                if (user.roles === "admin") {
                    throw new Error(index_2.Errors.ADMIN_EDIT_USER);
                }
                if (!(password || title || date_of_birth)) {
                    throw new Error(index_2.Errors.USER_UPDATE_FIELD_REQUIRED);
                }
                let user_info = { email: user.email, password, title, date_of_birth };
                let result = yield index_1.userService.editUser(user_info);
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
