import { Request, Response, NextFunction } from "express";
export declare class FeedbackValidator {
    getFeedback(req: Request, res: Response, next: NextFunction): void;
    postFeedback(req: Request, res: Response, next: NextFunction): void;
    updateFeedback(req: Request, res: Response, next: NextFunction): void;
    updateFeedbackStatus(req: Request, res: Response, next: NextFunction): void;
    updateFeedbackCount(req: Request, res: Response, next: NextFunction): void;
    deleteFeedback(req: Request, res: Response, next: NextFunction): void;
}
