import { Request, Response, NextFunction } from "express";
export declare class Controller {
    getUser(req: Request, res: Response): void;
    getTechnology(req: Request, res: Response): void;
    getFeedbacks(req: Request, res: Response): void;
    getFeedbacksByUser(req: Request, res: Response): void;
    postUser(req: Request, res: Response, next: NextFunction): void;
    postTechnology(req: Request, res: Response): void;
    postFeedback(req: Request, res: Response): void;
    updateTechnology(req: Request, res: Response): void;
    updateFeedback(req: Request, res: Response): void;
    updateFeedbackStatus(req: Request, res: Response): void;
    deleteUser(req: Request, res: Response): void;
    deleteTechnology(req: Request, res: Response): void;
    deleteFeedback(req: Request, res: Response): void;
}
