import {Request, Response, NextFunction} from "express"
import { helperFunctions } from "../utils/index"
import {object, string } from "yup"


export class UserValidator{

    deleteUser(req: Request, res: Response, next: NextFunction){
        let userSchema = object({
            email: string().email().required().trim().max(100)
        });

        let user_info: any = {
            email: req.body.email
        };

        userSchema.validate(user_info)
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

    loginUser(req: Request, res: Response, next: NextFunction){
        let userSchema = object({
            email: string().email().required().trim().max(100),
            password: string().required().trim().min(8).max(100)
        });

        let user_info: any = {
            email: req.body.email,
            password: req.body.password
        };

        userSchema.validate(user_info)
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

    postUser(req: Request, res: Response, next: NextFunction){
        let userSchema = object({
            name: string().required().lowercase().trim().min(3).max(50).matches(/^[a-z]+$/),
            email: string().email().required().trim().max(100),
            title: string().trim().uppercase().min(3).max(100),
            date_of_birth: string().trim().transform(helperFunctions.convertStringToDate)
        });

        let user_info: any = {
            name: req.body.name,
            email: req.body.email,
            title: req.body.title,
            date_of_birth: req.body.date_of_birth
        };

        userSchema.validate(user_info)
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
