import { Request, Response, NextFunction } from "express";
declare class Controller {
    getUserById(req: Request, res: Response): void;
    getTechnology(req: Request, res: Response): void;
    getFeedbacks(req: Request, res: Response): void;
    getFeedbacksByUser(req: Request, res: Response): void;
    postNewUser(req: Request, res: Response): void;
    postFeedback(req: Request, res: Response): void;
    postTechnology(req: Request, res: Response): void;
    updateFeedback(req: Request, res: Response): void;
    updateTechnology(req: Request, res: Response): void;
    updateFeedbackStatus(req: Request, res: Response): void;
    updateFeedbackCount(req: Request, res: Response): void;
    deleteUser(req: Request, res: Response): void;
    deleteTechnology(req: Request, res: Response): void;
    deleteFeedback(req: Request, res: Response): void;
    logUpdatedData(req: Request, res: Response, next: NextFunction): void;
    private checkUserExist;
    private checkTechnologyExist;
    private checkFeedbackExist;
    private addNewUser;
    private addNewTechnology;
    private addNewFeedback;
    private filterFeedback;
    private sortFeedback;
}
export declare const controller: Controller;
export {};
