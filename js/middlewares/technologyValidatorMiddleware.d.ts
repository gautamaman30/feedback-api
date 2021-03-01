import { Request, Response, NextFunction } from "express";
export declare class TechnologyValidator {
    postAndUpdateTechnology(req: Request, res: Response, next: NextFunction): void;
    deleteTechnology(req: Request, res: Response, next: NextFunction): void;
}
