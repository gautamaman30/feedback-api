"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppRoutes = void 0;
const index_1 = require("../controllers/index");
const controller = new index_1.Controller();
class AppRoutes {
    constructor(app) {
        this.app = app;
    }
    configureRoutes() {
        this.app.get('/api/user/:user_id', controller.getUserById.bind(controller));
        this.app.get('/api/feedback/', controller.getFeedbacks.bind(controller));
        this.app.get('/api/user/feedback/:user_id', controller.getFeedbacksByUser.bind(controller));
        this.app.get('/api/technology/:name', controller.getTechnology.bind(controller));
        this.app.post('/api/user/:user_id', controller.postNewUser.bind(controller));
        this.app.post('/api/technology/:user_id', controller.postTechnology.bind(controller));
        this.app.post('/api/feedback/:user_id', controller.postFeedback.bind(controller));
        this.app.delete('/api/user/:user_id', controller.deleteUser.bind(controller));
        this.app.delete('/api/technology/:user_id', controller.deleteTechnology.bind(controller));
        this.app.delete('/api/feedback/:user_id', controller.deleteFeedback.bind(controller));
        this.app.put('/api/technology/:user_id', controller.updateTechnology.bind(controller));
        this.app.put('/api/feedback/:user_id', controller.updateFeedback.bind(controller));
        this.app.put('/api/count/feedback/:feedback_id', controller.updateFeedbackCount.bind(controller));
        this.app.put('/api/status/feedback/:user_id', controller.updateFeedbackStatus.bind(controller));
        return this.app;
    }
}
exports.AppRoutes = AppRoutes;
