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
const index_1 = require("../models/index");
const index_2 = require("../utils/index");
const database = new index_1.Database();
class UserService {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let result = yield database.findAll('users');
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                result = result.filter(item => !item.admin_key);
                return result;
            }
            catch (err) {
                console.log(err);
                return { error: index_2.Errors.INTERNAL_ERROR };
            }
        });
    }
    getUsers(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user_info = {};
                user_info[key] = value;
                const result = yield database.findUsers(user_info);
                if (!result) {
                    throw new Error(index_2.Errors.USER_NOT_FOUND);
                }
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return result;
            }
            catch (err) {
                console.log(err);
                return { error: err.message };
            }
        });
    }
    removeUser(user_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database.deleteUser({ email: user_info.email });
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (result.deletedCount !== 1) {
                    throw new Error(index_2.Errors.USER_NOT_FOUND);
                }
                return { message: index_2.Messages.USER_DELETED };
            }
            catch (err) {
                console.log(err);
                return { error: err.message };
            }
        });
    }
    checkUserExist(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user_info = {};
                user_info[key] = value;
                const result = yield database.findUser(user_info);
                if (!result) {
                    throw new Error(index_2.Errors.USER_NOT_FOUND);
                }
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return result;
            }
            catch (err) {
                console.log(err);
                return { error: err.message };
            }
        });
    }
    checkAdminExist(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user_info = {};
                user_info[key] = value;
                const result = yield database.findUser(user_info);
                if (!result) {
                    throw new Error(index_2.Errors.ADMIN_NOT_FOUND);
                }
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (result.roles !== "admin") {
                    throw new Error(index_2.Errors.NOT_ADMIN);
                }
                return result;
            }
            catch (err) {
                console.log(err);
                return { error: err.message };
            }
        });
    }
    addUser(user_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user;
                user = {
                    user_id: index_2.helperFunctions.generateId(),
                    name: user_info.name,
                    email: user_info.email
                };
                if (user_info.title)
                    user.title = user_info.title;
                if (user_info.date_of_birth)
                    user.date_of_birth = user_info.date_of_birth;
                const result = yield database.insertUser(user);
                if (result.error || result.insertedCount < 1) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return user;
            }
            catch (err) {
                console.log(err);
                return { error: err.message };
            }
        });
    }
}
exports.default = UserService;
