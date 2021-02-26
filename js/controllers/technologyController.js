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
                    result = yield index_1.technologyService.checkTechnologyExist("name", index_2.controllersUtils.lowerCaseStrings(name));
                    if (result.error)
                        throw new Error(result.error);
                }
                else {
                    result = yield index_1.technologyService.getAllTechnologies();
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
    postTechnology(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin_key = req.body.admin_key;
                let name = req.body.name;
                if (!admin_key) {
                    throw new Error(index_2.Errors.ADMIN_KEY_REQUIRED);
                }
                if (!name) {
                    throw new Error(index_2.Errors.TECHNOLOGY_NAME_REQUIRED);
                }
                const admin = yield index_1.userService.checkUserExist("admin_key", admin_key);
                if (admin.error === index_2.Errors.INTERNAL_ERROR) {
                    throw new Error(admin.error);
                }
                if (admin.error) {
                    throw new Error(index_2.Errors.ADMIN_NOT_FOUND);
                }
                name = index_2.controllersUtils.lowerCaseStrings(name);
                const technology = yield index_1.technologyService.checkTechnologyExist("name", name);
                if (technology.error === index_2.Errors.INTERNAL_ERROR) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (technology.technology_id) {
                    throw new Error(index_2.Errors.DUPLICATE_TECHNOLOGY);
                }
                let result;
                if (req.body.details) {
                    const details = req.body.details;
                    result = yield index_1.technologyService.addTechnology({ name, details });
                }
                else {
                    result = yield index_1.technologyService.addTechnology({ name });
                }
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
                const admin_key = req.body.admin_key;
                let name = req.body.name;
                let details = req.body.details;
                if (!admin_key) {
                    throw new Error(index_2.Errors.ADMIN_KEY_REQUIRED);
                }
                if (!name) {
                    throw new Error(index_2.Errors.TECHNOLOGY_NAME_REQUIRED);
                }
                if (!details) {
                    throw new Error(index_2.Errors.TECHNOLOGY_DETAILS_REQUIRED);
                }
                const admin = yield index_1.userService.checkUserExist("admin_key", admin_key);
                if (admin.error === index_2.Errors.INTERNAL_ERROR) {
                    throw new Error(admin.error);
                }
                if (admin.error) {
                    throw new Error(index_2.Errors.ADMIN_NOT_FOUND);
                }
                name = index_2.controllersUtils.lowerCaseStrings(name);
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
                const admin_key = req.body.admin_key;
                let name = req.body.name;
                if (!admin_key) {
                    throw new Error(index_2.Errors.ADMIN_KEY_REQUIRED);
                }
                if (!name) {
                    throw new Error(index_2.Errors.TECHNOLOGY_NAME_REQUIRED);
                }
                const admin = yield index_1.userService.checkUserExist("admin_key", admin_key);
                if (admin.error === index_2.Errors.INTERNAL_ERROR) {
                    throw new Error(admin.error);
                }
                if (admin.error) {
                    throw new Error(index_2.Errors.ADMIN_NOT_FOUND);
                }
                name = index_2.controllersUtils.lowerCaseStrings(name);
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
