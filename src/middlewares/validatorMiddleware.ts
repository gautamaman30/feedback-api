import {Request, Response, NextFunction} from "express"
import { helperFunctions } from "../utils/index"
import {object, string } from "yup"


export class Validator{
    createUserValidator(req: Request, res: Response, next: NextFunction){
        let userSchema = object({
            name: string().required().lowercase().min(1).max(50),
            email: string().email().required().max(100),
            title: string().uppercase().min(1).max(100),
            date_of_birth: string().transform(helperFunctions.convertStringToDate)
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

    createTechnologyValidator(req: Request, res: Response, next: NextFunction){
        let technologySchema = object({
            name: string().required().lowercase().min(1).max(50),
            details: string().required().uppercase().min(1).max(100)
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

    createFeedbackValidator(req: Request, res: Response, next: NextFunction){
        let feedbackSchema = object({
            name: string().required().lowercase().min(1).max(50),
            user_id: string().required().length(10),
            feedback: string().required().min(1).max(200)
        });
          
        let feedback_info: any = {
            name: req.body.name,
            user_id: req.body.user_id,
            feedback: req.body.feedback
        };

        feedbackSchema.validate(feedback_info)
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

    updateFeedbackValidator(req: Request, res: Response, next: NextFunction){
        let feedbackSchema = object({
            feedback_id: string().required().length(10),
            user_id: string().required().length(10),
            feedback: string().required().min(1).max(200)
        });
          
        let feedback_info: any = {
            feedback_id: req.body.feedback_id,
            user_id: req.body.user_id,
            feedback: req.body.feedback
        };

        feedbackSchema.validate(feedback_info)
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

    updateFeedbackStatusValidator(req: Request, res: Response, next: NextFunction){
        let feedbackSchema = object({
            feedback_id: string().required().length(10),
            status: string().required().lowercase().matches(/(approved|rejected)/)
        });
          
        let feedback_info: any = {
            feedback_id: req.body.feedback_id,
            status: req.body.status,
        };

        feedbackSchema.validate(feedback_info)
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

    updateFeedbackCountValidator(req: Request, res: Response, next: NextFunction){
      let feedbackSchema = object({
          feedback_id: string().required().length(10),
          name: string().required().lowercase().min(1).max(50)
      });
        
      let feedback_info: any = {
          feedback_id: req.body.feedback_id,
          name: req.body.name,
      };

      feedbackSchema.validate(feedback_info)
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