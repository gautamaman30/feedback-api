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
            .delete(index_1.userValidator.deleteUser, index_2.userController.deleteUser);
        //Technology routes
        this.router.route('/technology')
            .get(index_2.technologyController.getTechnology)
            .post(index_1.technologyValidator.postAndUpdateTechnology, index_2.technologyController.postTechnology)
            .delete(index_1.technologyValidator.deleteTechnology, index_2.technologyController.deleteTechnology)
            .put(index_1.technologyValidator.postAndUpdateTechnology, index_2.technologyController.updateTechnology);
        //Feedback routes
        this.router.route('/feedback')
            .get(index_2.feedbackController.getFeedbacks)
            .post(index_1.feedbackValidator.postFeedback, index_2.feedbackController.postFeedback)
            .delete(index_1.feedbackValidator.deleteFeedback, index_2.feedbackController.deleteFeedback)
            .put(index_1.feedbackValidator.updateFeedback, index_2.feedbackController.updateFeedback);
        // change feedback status
        this.router.put('/feedback/status', index_1.feedbackValidator.updateFeedbackStatus, index_2.feedbackController.updateFeedbackStatus);
        //add user count for a feedback
        this.router.put('/feedback/count', index_1.feedbackValidator.updateFeedbackCount, index_2.feedbackController.updateFeedbackCount);
        //get all feedbacks posted by a user
        this.router.get('/user/feedbacks', index_1.feedbackValidator.getFeedback, index_2.feedbackController.getFeedbacksByUser);
        return this.router;
    }
}
exports.RoutesHandler = RoutesHandler;
