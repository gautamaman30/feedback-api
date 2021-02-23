import FeedbackController from "./feedbackController"
import UserController from "./userController"
import TechnologyController from "./technologyController"


const userController = new UserController();
const technologyController = new TechnologyController();
const feedbackController = new FeedbackController();


export { userController, feedbackController, technologyController};