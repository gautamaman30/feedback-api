import express from "express"
import {Controller} from "../controllers/index"
const controller = new Controller();


export class RoutesHandler{
    app: express.Application; 
    constructor(app: express.Application){
        this.app = app;
    }

    configureRoutes(): express.Application {
        //User routes
        this.app.get('/api/v1/get/users', controller.getUser.bind(controller));
        this.app.post('/api/v1/add/user', controller.postUser.bind(controller));
        this.app.delete('/api/v1/remove/user', controller.deleteUser.bind(controller));
        
        
        //Technology routes
        this.app.get('/api/v1/get/technologies', controller.getTechnology.bind(controller));
        this.app.post('/api/v1/add/technology', controller.postTechnology.bind(controller));
        this.app.delete('/api/v1/remove/technology', controller.deleteTechnology.bind(controller));
        this.app.put('/api/v1/update/technology', controller.updateTechnology.bind(controller));
        

        //Feedback routes
        this.app.get('/api/v1/get/feedbacks', controller.getFeedbacks.bind(controller));
        this.app.get('/api/v1/get/user/feedbacks', controller.getFeedbacksByUser.bind(controller));   
        this.app.post('/api/v1/add/feedback', controller.postFeedback.bind(controller));
        this.app.delete('/api/v1/remove/feedback', controller.deleteFeedback.bind(controller));
        this.app.put('/api/v1/update/feedback', controller.updateFeedback.bind(controller));
        this.app.put('/api/v1/update/feedback/status', controller.updateFeedbackStatus.bind(controller));

        return this.app;
    }
}
