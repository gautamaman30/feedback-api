import { AuthMiddleware } from "./authMiddleware";
import { Validator } from "./validatorMiddleware";
declare const authMiddleware: AuthMiddleware;
declare const validator: Validator;
export { authMiddleware, validator };
