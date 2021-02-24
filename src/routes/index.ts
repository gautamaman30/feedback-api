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
        this.app.route('/api/v1/user')
            .get(middleware.verifyToken, userController.getUser)
            .post(middleware.verifyToken, userController.postUser, middleware.signToken)
            .delete(middleware.verifyToken, userController.deleteUser);
        
        
        //Technology routes
        this.app.route('/api/v1/technology')
            .get(middleware.verifyToken, technologyController.getTechnology)
            .post(middleware.verifyToken, technologyController.postTechnology)
            .delete( middleware.verifyToken, technologyController.deleteTechnology)
            .put(middleware.verifyToken, technologyController.updateTechnology);
        

        //Feedback routes
        this.app.route('/api/v1/feedback')
            .get( middleware.verifyToken, feedbackController.getFeedbacks)
            .post(middleware.verifyToken, feedbackController.postFeedback)
            .delete( middleware.verifyToken, feedbackController.deleteFeedback)
            .put(middleware.verifyToken, feedbackController.updateFeedback);

        this.app.put('/api/v1/feedback/status', middleware.verifyToken, feedbackController.updateFeedbackStatus);
        this.app.get('/api/v1/user/feedbacks', middleware.verifyToken, feedbackController.getFeedbacksByUser);   
        
        return this.app;
    }
}
