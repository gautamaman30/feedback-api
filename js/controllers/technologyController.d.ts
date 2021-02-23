import { Request, Response } from "express";
export default class TechnologyController {
    getTechnology(req: Request, res: Response): Promise<void>;
    postTechnology(req: Request, res: Response): Promise<void>;
    updateTechnology(req: Request, res: Response): Promise<void>;
    deleteTechnology(req: Request, res: Response): Promise<void>;
}
