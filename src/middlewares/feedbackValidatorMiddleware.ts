import {Request, Response, NextFunction} from "express"
import {object, string } from "yup"
import { helperFunctions } from "../utils/index"


export class FeedbackValidator{
    getFeedback(req: Request, res: Response, next: NextFunction){
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

    postFeedback(req: Request, res: Response, next: NextFunction){
        let feedbackSchema = object({
            name: string().required().trim().lowercase().min(3).max(50).matches(/^[a-z]+$/),
            email: string().email().required().trim().max(100),
            feedback: string().required().trim().min(10).max(200)
        });

        let feedback_info: any = {
            name: req.body.name,
            email: req.body.email,
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

    updateFeedback(req: Request, res: Response, next: NextFunction){
        let feedbackSchema = object({
            feedback_id: string().required().trim().length(10),
            feedback: string().required().trim().min(10).max(200)
        });

        let feedback_info: any = {
            feedback_id: req.body.feedback_id,
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

    updateFeedbackStatus(req: Request, res: Response, next: NextFunction){
        let feedbackSchema = object({
            feedback_id: string().required().trim().length(10),
            status: string().required().trim().lowercase().matches(/(approved|rejected)/)
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

    updateFeedbackCount(req: Request, res: Response, next: NextFunction){
        let feedbackSchema = object({
          feedback_id: string().required().trim().length(10),
        });

        let feedback_info: any = {
          feedback_id: req.body.feedback_id
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

    deleteFeedback(req: Request, res: Response, next: NextFunction){
        let feedbackSchema = object({
          feedback_id: string().required().trim().length(10),
        });

        let feedback_info: any = {
          feedback_id: req.body.feedback_id
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
