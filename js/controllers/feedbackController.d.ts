import { Request, Response } from "express";
export default class FeedbackController {
    getFeedbacks(req: Request, res: Response): Promise<void>;
    getFeedbacksByUser(req: Request, res: Response): Promise<void>;
    postFeedback(req: Request, res: Response): Promise<void>;
    updateFeedback(req: Request, res: Response): Promise<void>;
    updateFeedbackStatus(req: Request, res: Response): Promise<void>;
    updateFeedbackCount(req: Request, res: Response): Promise<void>;
    deleteFeedback(req: Request, res: Response): Promise<void>;
}
