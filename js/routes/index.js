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
        //User routes
        this.app.route('/api/v1/user')
            .get(middleware.verifyToken, index_2.userController.getUser)
            .post(middleware.verifyToken, index_2.userController.postUser, middleware.signToken)
            .delete(middleware.verifyToken, index_2.userController.deleteUser);
        //Technology routes
        this.app.route('/api/v1/technology')
            .get(middleware.verifyToken, index_2.technologyController.getTechnology)
            .post(middleware.verifyToken, index_2.technologyController.postTechnology)
            .delete(middleware.verifyToken, index_2.technologyController.deleteTechnology)
            .put(middleware.verifyToken, index_2.technologyController.updateTechnology);
        //Feedback routes
        this.app.route('/api/v1/feedback')
            .get(middleware.verifyToken, index_2.feedbackController.getFeedbacks)
            .post(middleware.verifyToken, index_2.feedbackController.postFeedback)
            .delete(middleware.verifyToken, index_2.feedbackController.deleteFeedback)
            .put(middleware.verifyToken, index_2.feedbackController.updateFeedback);
        this.app.put('/api/v1/feedback/status', middleware.verifyToken, index_2.feedbackController.updateFeedbackStatus);
        this.app.get('/api/v1/user/feedbacks', middleware.verifyToken, index_2.feedbackController.getFeedbacksByUser);
        return this.app;
    }
}
exports.RoutesHandler = RoutesHandler;
