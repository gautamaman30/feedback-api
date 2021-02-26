import {Router} from "express"
import {Middleware} from "../middlewares/index"
import {userController, technologyController, feedbackController} from "../controllers/index"
const middleware = new Middleware();


export class RoutesHandler{
    router: Router; 
    constructor(){
        this.router = Router();
    }

    configureRoutes(): Router {

        this.router.use('/', middleware.checkRequestKeys, middleware.verifyToken);

        //User routes
        this.router.route('/user')
            .get(userController.getUser)
            .post(userController.postUser, middleware.signToken)
            .delete(userController.deleteUser);
        
        
        //Technology routes
        this.router.route('/technology')
            .get(technologyController.getTechnology)
            .post(technologyController.postTechnology)
            .delete(technologyController.deleteTechnology)
            .put(technologyController.updateTechnology);
        

        //Feedback routes
        this.router.route('/feedback')
            .get(feedbackController.getFeedbacks)
            .post(feedbackController.postFeedback)
            .delete(feedbackController.deleteFeedback)
            .put(feedbackController.updateFeedback);

        this.router.put('/feedback/status', feedbackController.updateFeedbackStatus);
        this.router.put('/feedback/count', feedbackController.updateFeedbackCount);
        this.router.get('/user/feedbacks', feedbackController.getFeedbacksByUser);   
        
        return this.router;
    }
}
