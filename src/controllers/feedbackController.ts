import {Request, Response } from "express"
import {userService, technologyService, feedbackService} from "../services/index"
import {helperFunctions, Errors} from "../utils/index"


export default class FeedbackController{
    async getFeedbacks(req: Request, res: Response) {
        try{
            const user_id: string = req.body.user_id;
            const feedback_id: any = req.query.feedback_id;
            const filter: any = req.query.filter;
            const sort: any = req.query.sort;


            let feedbacks: any = [];

            if(feedback_id) {
                const feedback: any = await feedbackService.checkFeedbackExist("feedback_id", feedback_id);
                if(feedback.error) {
                    throw new Error(feedback.error);
                }
                feedbacks[0] = feedback;
            } else if(filter || sort) {
                feedbacks = await feedbackService.getFeedbacksFilteredAndSorted(filter, sort);
            } else {
                feedbacks = await feedbackService.getAllFeedbacks();
            }
            
            if(feedbacks.error) {
                throw new Error(feedbacks.error);
            }

            let user: any = await userService.checkUserExist("user_id", user_id);
            if(user.error){
                throw new Error(user.error);
            }
            if(user.roles !== "admin"){
                feedbacks = feedbackService.filterFeedback(feedbacks, "status", ["approved"]);
            }

            feedbacks = helperFunctions.removeSensitiveData(feedbacks);

            res.status(200);
            res.send({feedbacks});
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    async getFeedbacksByUser(req: Request, res: Response){
        try{
            const user_id: string = req.body.user_id;
            const email: any = req.query.email;

            const user: any = await userService.checkUserExist("user_id", user_id);
            if(user.error) {
                throw new Error(user.error);
            }

            let feedbacks: any;

            if(user.roles !== "admin"){
                feedbacks = await feedbackService.getFeedbacks({"posted_by": email, "status": 'approved'});
            }
            else {
                feedbacks = await feedbackService.getFeedbacks({"posted_by": email});
            }
            if(feedbacks.error){
                throw new Error(feedbacks.error);
            }
            feedbacks = helperFunctions.removeSensitiveData(feedbacks);

            res.status(200);
            res.send({feedbacks});
        } catch(e){
            console.log(e.message);
            res.status(404);
            res.send({error: e.message});
        }
    }

    async postUserFeedback(req: Request, res: Response){
        try{
            const user_id: string = req.body.user_id;
            const feedback: string = req.body.feedback;
            const email: string = req.body.email;
            let name: string = req.body.name;

            const user: any = await userService.checkUserExist("user_id", user_id);
            if(user.error) {
                throw new Error(user.error);
            }
            if(user.roles === "admin"){
                throw new Error(Errors.ADMIN_POST_FEEDBACK);
            }

            let feedback_info: any = {name, feedback, posted_by: user.email, entity: 'user'};

            const check_user: any = await userService.checkUserExist("email", email);
            if(check_user.error){
                throw new Error(check_user.error);
            }
            if(check_user.user_id === user_id) {
                throw new Error(Errors.USER_POST_OWN_FEEDBACK)
            }
            feedback_info.entity_id = check_user.user_id;

            const result: any = await feedbackService.addFeedback(feedback_info);
            if(result.error) {
                 throw new Error(result.error);
            }

            res.status(201);
            res.send(result);
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    async postTechnologyFeedback(req: Request, res: Response){
        try{
            const user_id: string = req.body.user_id;
            const feedback: string = req.body.feedback;
            let name: string = req.body.name;

            const user: any = await userService.checkUserExist("user_id", user_id);
            if(user.error) {
                throw new Error(user.error);
            }
            if(user.roles === "admin"){
                throw new Error(Errors.ADMIN_POST_FEEDBACK);
            }

            let feedback_info: any = {name, feedback, posted_by: user.email, entity: 'technology'};

            const technology: any = await technologyService.checkTechnologyExist("name", name);
            if(technology.error) {
                throw new Error(technology.error);
            }
            feedback_info.entity_id = technology.technology_id;

            const result: any = await feedbackService.addFeedback(feedback_info);
            if(result.error) {
                 throw new Error(result.error);
            }

            res.status(201);
            res.send(result);
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    async updateFeedback(req: Request, res: Response){
        try{
            const user_id: string = req.body.user_id;
            const feedback_id: string = req.body.feedback_id;
            const feedback: string = req.body.feedback;

            const user: any = await userService.checkUserExist("user_id", user_id);
            if(user.error) {
                throw new Error(user.error);
            }
            if(user.roles === "admin"){
                throw new Error(Errors.ADMIN_EDIT_FEEDBACK);
            }

            const check_feedback: any = await feedbackService.checkFeedbackExist("feedback_id", feedback_id);
            if(check_feedback.error) {
                throw new Error(check_feedback.error);
            }
            if(check_feedback.posted_by !== user.user_id) {
                throw new Error(Errors.USER_EDIT_OTHERS_FEEDBACK);
            }

            const result: any = await feedbackService.editFeedback({feedback_id, feedback});
            if(result.error) {
                throw new Error(result.error);
            }

            res.status(200);
            res.send(result);
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    async updateFeedbackStatus(req: Request, res: Response){
        try{
            const admin_id: string = req.body.user_id;
            const feedback_id: string = req.body.feedback_id;
            let status: any = req.body.status;

            const admin: any = await userService.checkAdminExist("user_id", admin_id);
            if(admin.error){
                throw new Error(admin.error);
            }

            status = status.toLowerCase();
            const feedback: any = await feedbackService.editFeedbackStatus({feedback_id, status});
            if(feedback.error) {
                throw new Error(feedback.error);
            }

            res.status(200);
            res.send(feedback);
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    async updateFeedbackCount(req: Request, res: Response){
        try{
            const user_id: string = req.body.user_id;
            const feedback_id: string = req.body.feedback_id;


            const user: any = await userService.checkUserExist("user_id", user_id);
            if(user.error) {
                throw new Error(user.error);
            }
            if(user.roles === "admin") {
                throw new Error(Errors.ADMIN_EDIT_FEEDBACK);
            }

            const feedback: any = await feedbackService.checkFeedbackExist("feedback_id", feedback_id);
            if(feedback.error) {
                throw new Error(feedback.error);
            }
            for(let i of feedback.count_users){
                if(i === user.name){
                    throw new Error(Errors.FEEDBACK_USER_COUNT_EXIST);
                }
            }

            const result: any = await feedbackService.editFeedbackCount({feedback_id, count_users: user.name});
            if(feedback.error) {
                throw new Error(feedback.error);
            }

            res.status(200);
            res.send(result);
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    async deleteFeedback(req: Request, res: Response){
        try{
            const admin_id: string = req.body.user_id;
            const feedback_id: string = req.body.feedback_id;

            const admin: any = await userService.checkAdminExist("user_id", admin_id);
            if(admin.error) {
                throw new Error(admin.error);
            }

            const feedback: any = await feedbackService.checkFeedbackExist("feedback_id", feedback_id);
            if(feedback.error) {
                throw new Error(feedback.error);
            }

            const result: any = await feedbackService.removeFeedback({feedback_id});
            if(result.error) {
                throw new Error(result.error);
            }

            res.status(200);
            res.send(result);
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }
}
