import {Router} from "express"
import {authMiddleware, validator} from "../middlewares/index"
import {userController, technologyController, feedbackController} from "../controllers/index"


export class RoutesHandler{
    router: Router; 
    constructor(){
        this.router = Router();
    }

    configureRoutes(): Router {

        this.router.use('/', authMiddleware.checkRequestKeys, authMiddleware.verifyToken);

        //User routes
        this.router.route('/user')
            .get(userController.getUser)
            .post(validator.createUserValidator, userController.postUser, authMiddleware.signToken)
            .delete(userController.deleteUser);
        
        
        //Technology routes
        this.router.route('/technology')
            .get(technologyController.getTechnology)
            .post(validator.createTechnologyValidator, technologyController.postTechnology)
            .delete(technologyController.deleteTechnology)
            .put(validator.createTechnologyValidator, technologyController.updateTechnology);
        

        //Feedback routes
        this.router.route('/feedback')
            .get(feedbackController.getFeedbacks)
            .post(validator.createFeedbackValidator, feedbackController.postFeedback)
            .delete(feedbackController.deleteFeedback)
            .put(validator.updateFeedbackValidator, feedbackController.updateFeedback);
            
        this.router.put('/feedback/status', validator.updateFeedbackStatusValidator, feedbackController.updateFeedbackStatus);
        this.router.put('/feedback/count', validator.updateFeedbackCountValidator, feedbackController.updateFeedbackCount);
        this.router.get('/user/feedbacks', feedbackController.getFeedbacksByUser);   
        
        return this.router;
    }
}
