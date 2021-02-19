import {Application} from "express"
import {Middleware} from "../middlewares/index"
import {Controller} from "../controllers/index"
const middleware = new Middleware();
const controller = new Controller();


export class RoutesHandler{
    app: Application; 
    constructor(app: Application){
        this.app = app;
    }

    configureRoutes(): Application {
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
