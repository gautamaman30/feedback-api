"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesHandler = void 0;
const express_1 = require("express");
const index_1 = require("../middlewares/index");
const index_2 = require("../controllers/index");
const middleware = new index_1.Middleware();
class RoutesHandler {
    constructor() {
        this.router = express_1.Router();
    }
    configureRoutes() {
        this.router.use('/', middleware.checkRequestKeys, middleware.verifyToken);
        //User routes
        this.router.route('/user')
            .get(index_2.userController.getUser)
            .post(index_2.userController.postUser, middleware.signToken)
            .delete(index_2.userController.deleteUser);
        //Technology routes
        this.router.route('/technology')
            .get(index_2.technologyController.getTechnology)
            .post(index_2.technologyController.postTechnology)
            .delete(index_2.technologyController.deleteTechnology)
            .put(index_2.technologyController.updateTechnology);
        //Feedback routes
        this.router.route('/feedback')
            .get(index_2.feedbackController.getFeedbacks)
            .post(index_2.feedbackController.postFeedback)
            .delete(index_2.feedbackController.deleteFeedback)
            .put(index_2.feedbackController.updateFeedback);
        this.router.put('/feedback/status', index_2.feedbackController.updateFeedbackStatus);
        this.router.put('/feedback/count', index_2.feedbackController.updateFeedbackCount);
        this.router.get('/user/feedbacks', index_2.feedbackController.getFeedbacksByUser);
        return this.router;
    }
}
exports.RoutesHandler = RoutesHandler;
