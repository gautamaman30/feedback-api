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
        this.app.get('/api/v1/get/users', middleware.verifyToken, index_2.userController.getUser);
        this.app.post('/api/v1/add/user', middleware.verifyToken, index_2.userController.postUser, middleware.signToken);
        this.app.delete('/api/v1/remove/user', middleware.verifyToken, index_2.userController.deleteUser);
        //Technology routes
        this.app.get('/api/v1/get/technologies', middleware.verifyToken, index_2.technologyController.getTechnology);
        this.app.post('/api/v1/add/technology', middleware.verifyToken, index_2.technologyController.postTechnology);
        this.app.delete('/api/v1/remove/technology', middleware.verifyToken, index_2.technologyController.deleteTechnology);
        this.app.put('/api/v1/update/technology', middleware.verifyToken, index_2.technologyController.updateTechnology);
        //Feedback routes
        this.app.get('/api/v1/get/feedbacks', middleware.verifyToken, index_2.feedbackController.getFeedbacks);
        this.app.get('/api/v1/get/user/feedbacks', middleware.verifyToken, index_2.feedbackController.getFeedbacksByUser);
        this.app.post('/api/v1/add/feedback', middleware.verifyToken, index_2.feedbackController.postFeedback);
        this.app.delete('/api/v1/remove/feedback', middleware.verifyToken, index_2.feedbackController.deleteFeedback);
        this.app.put('/api/v1/update/feedback', middleware.verifyToken, index_2.feedbackController.updateFeedback);
        this.app.put('/api/v1/update/feedback/status', middleware.verifyToken, index_2.feedbackController.updateFeedbackStatus);
        return this.app;
    }
}
exports.RoutesHandler = RoutesHandler;
