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
class TechnologyService {
    getAllTechnologies() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database.findAll('technologies');
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return result;
            }
            catch (err) {
                console.log(err);
                return { error: index_2.Errors.INTERNAL_ERROR };
            }
        });
    }
    editTechnology(technology_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database.updateTechnology({ name: technology_info.name }, { details: technology_info.details });
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (result.matchedCount < 1) {
                    throw new Error(index_2.Errors.TECHNOLOGY_NOT_FOUND);
                }
                return { message: index_2.Messages.TECHNOLOGY_UPDATED };
            }
            catch (err) {
                console.log(err);
                return { error: err.message };
            }
        });
    }
    removeTechnology(technology_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield database.deleteTechnology({ name: technology_info.name });
                if (result.error) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                if (result.deletedCount !== 1) {
                    throw new Error(index_2.Errors.TECHNOLOGY_NOT_FOUND);
                }
                return { message: index_2.Messages.TECHNOLOGY_DELETED };
            }
            catch (err) {
                console.log(err);
                return { error: err.message };
            }
        });
    }
    checkTechnologyExist(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let technology_info = {};
                technology_info[key] = value;
                const result = yield database.findTechnology(technology_info);
                if (!result) {
                    throw new Error(index_2.Errors.TECHNOLOGY_NOT_FOUND);
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
    addTechnology(technology_info) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let technology;
                technology = {
                    technology_id: index_2.servicesUtils.generateId(),
                    name: technology_info.name,
                };
                if (technology_info.details)
                    technology.details = technology_info.details;
                const result = yield database.insertTechnology(technology);
                if (result.error || result.insertedCount < 1) {
                    throw new Error(index_2.Errors.INTERNAL_ERROR);
                }
                return { message: index_2.Messages.TECHNOLOGY_CREATED };
            }
            catch (err) {
                console.log(err);
                return { error: err.message };
            }
        });
    }
}
exports.default = TechnologyService;
