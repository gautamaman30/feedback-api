"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidator = void 0;
const index_1 = require("../utils/index");
const yup_1 = require("yup");
class UserValidator {
    deleteUser(req, res, next) {
        let userSchema = yup_1.object({
            email: yup_1.string().email().required().trim().max(100)
        });
        let user_info = {
            email: req.body.email
        };
        userSchema.validate(user_info)
            .then((result) => {
            console.log(result);
            return next();
        }).catch(err => {
            console.log(err);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    loginUser(req, res, next) {
        let userSchema = yup_1.object({
            email: yup_1.string().email().required().trim().max(100),
            password: yup_1.string().required().trim().min(8).max(100)
        });
        let user_info = {
            email: req.body.email,
            password: req.body.password
        };
        userSchema.validate(user_info)
            .then((result) => {
            console.log(result);
            return next();
        }).catch(err => {
            console.log(err);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    postUser(req, res, next) {
        let userSchema = yup_1.object({
            name: yup_1.string().required().lowercase().trim().min(3).max(50).matches(/^[a-z]+$/),
            email: yup_1.string().email().required().trim().max(100),
            title: yup_1.string().trim().uppercase().min(3).max(100),
            date_of_birth: yup_1.string().trim().transform(index_1.helperFunctions.convertStringToDate)
        });
        let user_info = {
            name: req.body.name,
            email: req.body.email,
            title: req.body.title,
            date_of_birth: req.body.date_of_birth
        };
        userSchema.validate(user_info)
            .then((result) => {
            console.log(result);
            return next();
        }).catch(err => {
            console.log(err);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
}
exports.UserValidator = UserValidator;
