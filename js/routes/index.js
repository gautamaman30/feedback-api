"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesHandler = void 0;
const express_1 = require("express");
const index_1 = require("../middlewares/index");
const index_2 = require("../controllers/index");
class RoutesHandler {
    constructor() {
        this.router = express_1.Router();
    }
    configureRoutes() {
        this.router.use('/', index_1.authMiddleware.checkRequestKeys, index_1.authMiddleware.verifyToken);
        //User routes
        this.router.route('/user')
            .get(index_2.userController.getUser)
            .post(index_1.validator.createUserValidator, index_2.userController.postUser, index_1.authMiddleware.signToken)
            .delete(index_2.userController.deleteUser);
        //Technology routes
        this.router.route('/technology')
            .get(index_2.technologyController.getTechnology)
            .post(index_1.validator.createTechnologyValidator, index_2.technologyController.postTechnology)
            .delete(index_2.technologyController.deleteTechnology)
            .put(index_1.validator.createTechnologyValidator, index_2.technologyController.updateTechnology);
        //Feedback routes
        this.router.route('/feedback')
            .get(index_2.feedbackController.getFeedbacks)
            .post(index_1.validator.createFeedbackValidator, index_2.feedbackController.postFeedback)
            .delete(index_2.feedbackController.deleteFeedback)
            .put(index_1.validator.updateFeedbackValidator, index_2.feedbackController.updateFeedback);
        this.router.put('/feedback/status', index_1.validator.updateFeedbackStatusValidator, index_2.feedbackController.updateFeedbackStatus);
        this.router.put('/feedback/count', index_1.validator.updateFeedbackCountValidator, index_2.feedbackController.updateFeedbackCount);
        this.router.get('/user/feedbacks', index_2.feedbackController.getFeedbacksByUser);
        return this.router;
    }
}
exports.RoutesHandler = RoutesHandler;
