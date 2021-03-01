import { AuthMiddleware } from "./authMiddleware"
import { FeedbackValidator } from "./feedbackValidatorMiddleware"
import { TechnologyValidator } from "./technologyValidatorMiddleware"
import { UserValidator } from "./userValidatorMiddleware"


const authMiddleware = new AuthMiddleware();
const userValidator = new UserValidator();
const feedbackValidator = new FeedbackValidator();
const technologyValidator = new TechnologyValidator();


export {authMiddleware, userValidator, feedbackValidator, technologyValidator};
