import { Request, Response, NextFunction } from "express";
export declare class Middleware {
    signToken(req: Request, res: Response): void;
    verifyToken(req: Request, res: Response, next: NextFunction): void;
    checkRequestKeys(req: Request, res: Response, next: NextFunction): void;
}
