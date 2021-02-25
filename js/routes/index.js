"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesHandler = void 0;
const index_1 = require("../middlewares/index");
const index_2 = require("../controllers/index");
const middleware = new index_1.Middleware();
class RoutesHandler {
    constructor(app) {
        this.app = app;
    }
    configureRoutes() {
        this.app.use('/', middleware.checkRequestKeys, middleware.verifyToken);
        //User routes
        this.app.route('/api/v1/user')
            .get(index_2.userController.getUser)
            .post(index_2.userController.postUser, middleware.signToken)
            .delete(index_2.userController.deleteUser);
        //Technology routes
        this.app.route('/api/v1/technology')
            .get(index_2.technologyController.getTechnology)
            .post(index_2.technologyController.postTechnology)
            .delete(index_2.technologyController.deleteTechnology)
            .put(index_2.technologyController.updateTechnology);
        //Feedback routes
        this.app.route('/api/v1/feedback')
            .get(index_2.feedbackController.getFeedbacks)
            .post(index_2.feedbackController.postFeedback)
            .delete(index_2.feedbackController.deleteFeedback)
            .put(index_2.feedbackController.updateFeedback);
        this.app.put('/api/v1/feedback/status', index_2.feedbackController.updateFeedbackStatus);
        this.app.put('/api/v1/feedback/count', index_2.feedbackController.updateFeedbackCount);
        this.app.get('/api/v1/user/feedbacks', index_2.feedbackController.getFeedbacksByUser);
        return this.app;
    }
}
exports.RoutesHandler = RoutesHandler;
