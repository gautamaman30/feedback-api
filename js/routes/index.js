"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesHandler = void 0;
const index_1 = require("../middlewares/index");
const index_2 = require("../controllers/index");
const middleware = new index_1.Middleware();
const controller = new index_2.Controller();
class RoutesHandler {
    constructor(app) {
        this.app = app;
    }
    configureRoutes() {
        //User routes
        this.app.get('/api/v1/get/users', middleware.verifyToken, controller.getUser);
        this.app.post('/api/v1/add/user', middleware.verifyToken, controller.postUser, middleware.signToken);
        this.app.delete('/api/v1/remove/user', middleware.verifyToken, controller.deleteUser);
        //Technology routes
        this.app.get('/api/v1/get/technologies', middleware.verifyToken, controller.getTechnology);
        this.app.post('/api/v1/add/technology', middleware.verifyToken, controller.postTechnology);
        this.app.delete('/api/v1/remove/technology', middleware.verifyToken, controller.deleteTechnology);
        this.app.put('/api/v1/update/technology', middleware.verifyToken, controller.updateTechnology);
        //Feedback routes
        this.app.get('/api/v1/get/feedbacks', middleware.verifyToken, controller.getFeedbacks);
        this.app.get('/api/v1/get/user/feedbacks', middleware.verifyToken, controller.getFeedbacksByUser);
        this.app.post('/api/v1/add/feedback', middleware.verifyToken, controller.postFeedback);
        this.app.delete('/api/v1/remove/feedback', middleware.verifyToken, controller.deleteFeedback);
        this.app.put('/api/v1/update/feedback', middleware.verifyToken, controller.updateFeedback);
        this.app.put('/api/v1/update/feedback/status', middleware.verifyToken, controller.updateFeedbackStatus);
        return this.app;
    }
}
exports.RoutesHandler = RoutesHandler;
