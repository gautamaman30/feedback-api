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
        this.router.use('/', index_1.authMiddleware.checkRequestKeys);
        this.router.post('/user/login', index_1.userValidator.loginUser, index_2.userController.loginUser, index_1.authMiddleware.signToken);
        this.router.use('/', index_1.authMiddleware.verifyToken);
        //User routes
        this.router.route('/user')
            .get(index_2.userController.getUser)
            .post(index_1.userValidator.postUser, index_2.userController.postUser, index_1.authMiddleware.signToken)
            .delete(index_1.userValidator.deleteUser, index_2.userController.deleteUser)
            .put(index_1.userValidator.updateUser, index_2.userController.updateUser);
        //Technology routes
        this.router.route('/technology')
            .get(index_2.technologyController.getTechnology)
            .post(index_1.technologyValidator.postAndUpdateTechnology, index_2.technologyController.postTechnology)
            .delete(index_1.technologyValidator.deleteTechnology, index_2.technologyController.deleteTechnology)
            .put(index_1.technologyValidator.postAndUpdateTechnology, index_2.technologyController.updateTechnology);
        //Feedback routes
        this.router.route('/feedback')
            .get(index_1.feedbackValidator.getFeedbacks, index_2.feedbackController.getFeedbacks)
            .delete(index_1.feedbackValidator.deleteFeedback, index_2.feedbackController.deleteFeedback)
            .put(index_1.feedbackValidator.updateFeedback, index_2.feedbackController.updateFeedback);
        // change feedback status
        this.router.put('/feedback/status', index_1.feedbackValidator.updateFeedbackStatus, index_2.feedbackController.updateFeedbackStatus);
        //add user count for a feedback
        this.router.put('/feedback/count', index_1.feedbackValidator.updateFeedbackCount, index_2.feedbackController.updateFeedbackCount);
        //get all feedbacks posted by a user and post feedback for a user
        this.router.route('/user/feedback')
            .get(index_1.feedbackValidator.getFeedbacksByUser, index_2.feedbackController.getFeedbacksByUser)
            .post(index_1.feedbackValidator.postUserFeedback, index_2.feedbackController.postUserFeedback);
        //post feedback for a technology
        this.router.route('/technology/feedback')
            .post(index_1.feedbackValidator.postTechnologyFeedback, index_2.feedbackController.postTechnologyFeedback);
        return this.router;
    }
}
exports.RoutesHandler = RoutesHandler;
