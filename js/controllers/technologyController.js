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
class TechnologyController {
    getTechnology(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const technology_id = req.query.technology_id;
                const name = req.query.name;
                let result;
                if (technology_id) {
                    result = yield index_1.technologyService.checkTechnologyExist("technology_id", technology_id);
                    if (result.error)
                        throw new Error(result.error);
                }
                else if (name) {
                    result = yield index_1.technologyService.checkTechnologyExist("name", name.toLowerCase());
                    if (result.error)
                        throw new Error(result.error);
                }
                else {
                    result = yield index_1.technologyService.getAllTechnologies();
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
    postTechnology(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin_id = req.body.user_id;
                let name = req.body.name;
                let details = req.body.details;
                const admin = yield index_1.userService.checkAdminExist("user_id", admin_id);
                if (admin.error) {
                    throw new Error(admin.error);
                }
                name = name.toLowerCase();
                const technology = yield index_1.technologyService.checkTechnologyExist("name", name);
                if (technology.error === index_2.Errors.INTERNAL_ERROR) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (technology.technology_id) {
                    throw new Error(index_2.Errors.DUPLICATE_TECHNOLOGY);
                }
                let result = yield index_1.technologyService.addTechnology({ name, details });
                if (result.error) {
                    throw new Error(result.error);
                }
                res.status(201);
                res.send(result);
            }
            catch (e) {
                console.log(e.message);
                res.status(400);
                res.send({ error: e.message });
            }
        });
    }
    updateTechnology(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin_id = req.body.user_id;
                let name = req.body.name;
                let details = req.body.details;
                const admin = yield index_1.userService.checkAdminExist("user_id", admin_id);
                if (admin.error) {
                    throw new Error(admin.error);
                }
                name = name.toLowerCase();
                const technology = yield index_1.technologyService.checkTechnologyExist("name", name);
                if (technology.error) {
                    throw new Error(technology.error);
                }
                const result = yield index_1.technologyService.editTechnology({ name, details });
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
    deleteTechnology(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin_id = req.body.user_id;
                let name = req.body.name;
                const admin = yield index_1.userService.checkAdminExist("user_id", admin_id);
                if (admin.error) {
                    throw new Error(admin.error);
                }
                name = name.toLowerCase();
                const technology = yield index_1.technologyService.checkTechnologyExist("name", name);
                if (technology.error) {
                    throw new Error(technology.error);
                }
                const result = yield index_1.technologyService.removeTechnology({ name });
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
exports.default = TechnologyController;
