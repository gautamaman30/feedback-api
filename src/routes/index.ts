import {Application} from "express"
import {Middleware} from "../middlewares/index"
import {userController, technologyController, feedbackController} from "../controllers/index"
const middleware = new Middleware();


export class RoutesHandler{
    app: Application; 
    constructor(app: Application){
        this.app = app;
    }

    configureRoutes(): Application {
        //User routes
        this.app.get('/api/v1/get/users', middleware.verifyToken, userController.getUser);
        this.app.post('/api/v1/add/user', middleware.verifyToken, userController.postUser, middleware.signToken);
        this.app.delete('/api/v1/remove/user', middleware.verifyToken, userController.deleteUser);
        
        
        //Technology routes
        this.app.get('/api/v1/get/technologies', middleware.verifyToken, technologyController.getTechnology);
        this.app.post('/api/v1/add/technology', middleware.verifyToken, technologyController.postTechnology);
        this.app.delete('/api/v1/remove/technology', middleware.verifyToken, technologyController.deleteTechnology);
        this.app.put('/api/v1/update/technology', middleware.verifyToken, technologyController.updateTechnology);
        

        //Feedback routes
        this.app.get('/api/v1/get/feedbacks', middleware.verifyToken, feedbackController.getFeedbacks);
        this.app.get('/api/v1/get/user/feedbacks', middleware.verifyToken, feedbackController.getFeedbacksByUser);   
        this.app.post('/api/v1/add/feedback', middleware.verifyToken, feedbackController.postFeedback);
        this.app.delete('/api/v1/remove/feedback', middleware.verifyToken, feedbackController.deleteFeedback);
        this.app.put('/api/v1/update/feedback', middleware.verifyToken, feedbackController.updateFeedback);
        this.app.put('/api/v1/update/feedback/status', middleware.verifyToken, feedbackController.updateFeedbackStatus);

        return this.app;
    }
}
