"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
const index_1 = require("../utils/index");
const yup_1 = require("yup");
class Validator {
    createUserValidator(req, res, next) {
        let userSchema = yup_1.object({
            name: yup_1.string().required().lowercase().min(1).max(50),
            email: yup_1.string().email().required().max(100),
            title: yup_1.string().uppercase().min(1).max(100),
            date_of_birth: yup_1.string().transform(index_1.helperFunctions.convertStringToDate)
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
    createTechnologyValidator(req, res, next) {
        let technologySchema = yup_1.object({
            name: yup_1.string().required().lowercase().min(1).max(50),
            details: yup_1.string().required().uppercase().min(1).max(100)
        });
        let technology_info = {
            name: req.body.name,
            details: req.body.details
        };
        technologySchema.validate(technology_info)
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
    createFeedbackValidator(req, res, next) {
        let feedbackSchema = yup_1.object({
            name: yup_1.string().required().lowercase().min(1).max(50),
            user_id: yup_1.string().required().length(10),
            feedback: yup_1.string().required().min(1).max(200)
        });
        let feedback_info = {
            name: req.body.name,
            user_id: req.body.user_id,
            feedback: req.body.feedback
        };
        feedbackSchema.validate(feedback_info)
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
    updateFeedbackValidator(req, res, next) {
        let feedbackSchema = yup_1.object({
            feedback_id: yup_1.string().required().length(10),
            user_id: yup_1.string().required().length(10),
            feedback: yup_1.string().required().min(1).max(200)
        });
        let feedback_info = {
            feedback_id: req.body.feedback_id,
            user_id: req.body.user_id,
            feedback: req.body.feedback
        };
        feedbackSchema.validate(feedback_info)
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
    updateFeedbackStatusValidator(req, res, next) {
        let feedbackSchema = yup_1.object({
            feedback_id: yup_1.string().required().length(10),
            status: yup_1.string().required().lowercase().matches(/(approved|rejected)/)
        });
        let feedback_info = {
            feedback_id: req.body.feedback_id,
            status: req.body.status,
        };
        feedbackSchema.validate(feedback_info)
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
    updateFeedbackCountValidator(req, res, next) {
        let feedbackSchema = yup_1.object({
            feedback_id: yup_1.string().required().length(10),
            name: yup_1.string().required().lowercase().min(1).max(50)
        });
        let feedback_info = {
            feedback_id: req.body.feedback_id,
            name: req.body.name,
        };
        feedbackSchema.validate(feedback_info)
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
exports.Validator = Validator;
