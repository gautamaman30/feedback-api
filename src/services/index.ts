import UserService from "./userService"
import TechnologyService from "./technologyService"
import FeedbackService from "./feedbackService"


const userService = new UserService();
const technologyService = new TechnologyService();
const feedbackService = new FeedbackService();


export {userService, technologyService, feedbackService};