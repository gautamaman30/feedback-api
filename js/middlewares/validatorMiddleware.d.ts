import { Request, Response, NextFunction } from "express";
export declare class Validator {
    createUserValidator(req: Request, res: Response, next: NextFunction): void;
    createTechnologyValidator(req: Request, res: Response, next: NextFunction): void;
    createFeedbackValidator(req: Request, res: Response, next: NextFunction): void;
    updateFeedbackValidator(req: Request, res: Response, next: NextFunction): void;
    updateFeedbackStatusValidator(req: Request, res: Response, next: NextFunction): void;
    updateFeedbackCountValidator(req: Request, res: Response, next: NextFunction): void;
}
