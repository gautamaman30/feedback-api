import { AuthMiddleware } from "./authMiddleware"
import { Validator } from "./validatorMiddleware"


const authMiddleware = new AuthMiddleware();
const validator = new Validator();


export {authMiddleware, validator};
