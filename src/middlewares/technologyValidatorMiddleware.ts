import {Request, Response, NextFunction} from "express"
import {object, string } from "yup"
import { helperFunctions } from "../utils/index"



export class TechnologyValidator{

    postAndUpdateTechnology(req: Request, res: Response, next: NextFunction){
        let technologySchema = object({
            name: string().required().lowercase().trim().min(3).max(50).matches(/^[a-z]+$/),
            details: string().required().trim().min(4).max(100)
        });

        let technology_info: any = {
            name: req.body.name,
            details: req.body.details
        };

        technologySchema.validate(technology_info)
            .then((result) => {
              console.log(result);
              return next();
            }).catch(err => {
              console.log(err);
              res.status(400);
              let error = helperFunctions.capitalizeString(err.errors);
              res.send({error});
            })
    }

    deleteTechnology(req: Request, res: Response, next: NextFunction){
        let technologySchema = object({
            name: string().required().lowercase().trim().min(3).max(50).matches(/^[a-z]+$/)
        });

        let technology_info: any = {
            name: req.body.name
        };

        technologySchema.validate(technology_info)
            .then((result) => {
              console.log(result);
              return next();
            }).catch(err => {
              console.log(err);
              res.status(400);
              let error = helperFunctions.capitalizeString(err.errors);
              res.send({error});
            })
    }
}
