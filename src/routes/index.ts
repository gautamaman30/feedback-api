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

        this.app.use('/', middleware.checkRequestKeys, middleware.verifyToken);
        
        //User routes
        this.app.route('/api/v1/user')
            .get(userController.getUser)
            .post(userController.postUser, middleware.signToken)
            .delete(userController.deleteUser);
        
        
        //Technology routes
        this.app.route('/api/v1/technology')
            .get(technologyController.getTechnology)
            .post(technologyController.postTechnology)
            .delete(technologyController.deleteTechnology)
            .put(technologyController.updateTechnology);
        

        //Feedback routes
        this.app.route('/api/v1/feedback')
            .get(feedbackController.getFeedbacks)
            .post(feedbackController.postFeedback)
            .delete(feedbackController.deleteFeedback)
            .put(feedbackController.updateFeedback);

        this.app.put('/api/v1/feedback/status', feedbackController.updateFeedbackStatus);
        this.app.put('/api/v1/feedback/count', feedbackController.updateFeedbackCount);
        this.app.get('/api/v1/user/feedbacks', feedbackController.getFeedbacksByUser);   
        
        return this.app;
    }
}
