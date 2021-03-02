import { Request, Response, NextFunction } from "express";
export declare class FeedbackValidator {
    getFeedbacks(req: Request, res: Response, next: NextFunction): void;
    getFeedbacksByUser(req: Request, res: Response, next: NextFunction): void;
    postUserFeedback(req: Request, res: Response, next: NextFunction): void;
    postTechnologyFeedback(req: Request, res: Response, next: NextFunction): void;
    updateFeedback(req: Request, res: Response, next: NextFunction): void;
    updateFeedbackStatus(req: Request, res: Response, next: NextFunction): void;
    updateFeedbackCount(req: Request, res: Response, next: NextFunction): void;
    deleteFeedback(req: Request, res: Response, next: NextFunction): void;
}
