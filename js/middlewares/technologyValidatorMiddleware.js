"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TechnologyValidator = void 0;
const yup_1 = require("yup");
const index_1 = require("../utils/index");
class TechnologyValidator {
    postAndUpdateTechnology(req, res, next) {
        let technologySchema = yup_1.object({
            name: yup_1.string().required().lowercase().trim().min(3).max(50).matches(/^[a-z]+$/),
            details: yup_1.string().required().trim().min(4).max(100)
        });
        let technology_info = {
            name: req.body.name,
            details: req.body.details
        };
        technologySchema.validate(technology_info)
            .then((result) => {
            console.log(result);
            req.body.name = result.name;
            req.body.details = result.details;
            return next();
        }).catch(err => {
            console.log(err);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    deleteTechnology(req, res, next) {
        let technologySchema = yup_1.object({
            name: yup_1.string().required().lowercase().trim().min(3).max(50).matches(/^[a-z]+$/)
        });
        let technology_info = {
            name: req.body.name
        };
        technologySchema.validate(technology_info)
            .then((result) => {
            console.log(result);
            req.body.name = result.name;
            return next();
        }).catch(err => {
            console.log(err);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
}
exports.TechnologyValidator = TechnologyValidator;
