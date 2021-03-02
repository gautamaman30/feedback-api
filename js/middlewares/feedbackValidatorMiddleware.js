"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackValidator = void 0;
const yup_1 = require("yup");
const index_1 = require("../utils/index");
class FeedbackValidator {
    getFeedbacks(req, res, next) {
        let userSchema = yup_1.object({
            filter: yup_1.string().trim().matches(/(user|technology|status)/),
            sort: yup_1.string().trim().matches(/(date|count)/)
        });
        let user_info = {
            filter: req.query.filter,
            sort: req.query.sort
        };
        userSchema.validate(user_info)
            .then((result) => {
            console.log(result);
            req.query.filter = result.filter;
            req.query.sort = result.sort;
            return next();
        }).catch(err => {
            console.log(err);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    getFeedbacksByUser(req, res, next) {
        let userSchema = yup_1.object({
            email: yup_1.string().email().required().trim().max(100)
        });
        let user_info = {
            email: req.body.email
        };
        userSchema.validate(user_info)
            .then((result) => {
            console.log(result);
            req.body.email = result.email;
            return next();
        }).catch(err => {
            console.log(err);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    postFeedback(req, res, next) {
        let feedbackSchema = yup_1.object({
            name: yup_1.string().required().trim().lowercase().min(3).max(50).matches(/^[a-z]+$/),
            email: yup_1.string().email().required().trim().max(100),
            feedback: yup_1.string().required().trim().min(10).max(200)
        });
        let feedback_info = {
            name: req.body.name,
            email: req.body.email,
            feedback: req.body.feedback
        };
        feedbackSchema.validate(feedback_info)
            .then((result) => {
            console.log(result);
            req.body.email = result.email;
            req.body.name = result.name;
            req.body.feedback = result.feedback;
            return next();
        }).catch(err => {
            console.log(err);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    updateFeedback(req, res, next) {
        let feedbackSchema = yup_1.object({
            feedback_id: yup_1.string().required().trim().length(10),
            feedback: yup_1.string().required().trim().min(10).max(200)
        });
        let feedback_info = {
            feedback_id: req.body.feedback_id,
            feedback: req.body.feedback
        };
        feedbackSchema.validate(feedback_info)
            .then((result) => {
            console.log(result);
            req.body.feedback_id = result.feedback_id;
            req.body.feedback = result.feedback;
            return next();
        }).catch(err => {
            console.log(err);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    updateFeedbackStatus(req, res, next) {
        let feedbackSchema = yup_1.object({
            feedback_id: yup_1.string().required().trim().length(10),
            status: yup_1.string().required().trim().lowercase().matches(/(approved|rejected)/)
        });
        let feedback_info = {
            feedback_id: req.body.feedback_id,
            status: req.body.status,
        };
        feedbackSchema.validate(feedback_info)
            .then((result) => {
            console.log(result);
            req.body.feedback_id = result.feedback_id;
            req.body.status = result.status;
            return next();
        }).catch(err => {
            console.log(err);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    updateFeedbackCount(req, res, next) {
        let feedbackSchema = yup_1.object({
            feedback_id: yup_1.string().required().trim().length(10),
        });
        let feedback_info = {
            feedback_id: req.body.feedback_id
        };
        feedbackSchema.validate(feedback_info)
            .then((result) => {
            console.log(result);
            req.body.feedback_id = result.feedback_id;
            return next();
        }).catch(err => {
            console.log(err);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
    deleteFeedback(req, res, next) {
        let feedbackSchema = yup_1.object({
            feedback_id: yup_1.string().required().trim().length(10),
        });
        let feedback_info = {
            feedback_id: req.body.feedback_id
        };
        feedbackSchema.validate(feedback_info)
            .then((result) => {
            console.log(result);
            req.body.feedback_id = result.feedback_id;
            return next();
        }).catch(err => {
            console.log(err);
            res.status(400);
            let error = index_1.helperFunctions.capitalizeString(err.errors);
            res.send({ error });
        });
    }
}
exports.FeedbackValidator = FeedbackValidator;
