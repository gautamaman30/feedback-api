import {Request, Response } from "express"
import {userService, technologyService, feedbackService} from "../services/index"
import { ControllersUtils } from "../utils/controllersUtils";
import {controllersUtils, Errors} from "../utils/index"


export default class FeedbackController{
    async getFeedbacks(req: Request, res: Response){
        try{
            const admin_key = req.body.admin_key;
            const feedback_id = req.query.feedback_id;
            const filter = req.query.filter;
            const sort = req.query.sort;
            
            let admin;
            if(admin_key){
                admin = await userService.checkUserExist("admin_key", admin_key);
                if(admin.error) throw new Error(admin.error);
            } 

            let feedbacks: any = await feedbackService.getAllFeedbacks();
                
            if(feedback_id){
                const feedback: any = await feedbackService.checkFeedbackExist("feedback_id", feedback_id);
                if(feedback.error) throw new Error(feedback.error);

                feedbacks = feedback;     
            }
            else if(filter || sort){
                if(filter){
                    if(filter === "user"){
                        feedbacks = feedbackService.filterFeedbackKeys(feedbacks, "user_id");
                    } else if(filter === "technology"){
                        feedbacks = feedbackService.filterFeedbackKeys(feedbacks, "technology_id");
                    } else if(filter === "status"){
                        feedbacks = feedbackService.filterFeedback(feedbacks, "status", ["approved"]);
                    }
                } 
                if(sort){
                    if(sort === "date"){
                        feedbacks = feedbackService.sortFeedback(feedbacks, "created_on");
                    } else if(sort === "count"){
                        feedbacks = feedbackService.sortFeedback(feedbacks, "count");
                    } 
                }
            } 

            if(!admin){
                feedbacks = feedbackService.filterFeedback(feedbacks, "status", ["approved"]);
            }
            res.status(200);
            res.send({"feedbacks": feedbacks});
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    async getFeedbacksByUser(req: Request, res: Response){
        try{
            const admin_key: string = req.body.admin_key;  
            const user_id: any = req.query.user_id;

            if(!user_id) {
                throw new Error(Errors.USER_ID_REQUIRED);
            }
                
            let admin;
            if(admin_key){
                admin = await userService.checkUserExist("admin_key", admin_key);
                if(admin.error) throw new Error(admin.error);
            }

            const user: any = await userService.checkUserExist("user_id", user_id);
            if(user.error) throw new Error(user.error);

            let feedbacks = await feedbackService.getAllFeedbacks();
            feedbacks = feedbackService.filterFeedback(feedbacks, "posted_by", [user_id]);

            if(!admin){
                feedbacks = feedbackService.filterFeedback(feedbacks, "status", ['approved']);
            }

            res.status(200);
            res.send({"feedbacks": feedbacks});
        } catch(e){
            console.log(e.message);
            res.status(404);
            res.send({error: e.message});
        }
    }

    async postFeedback(req: Request, res: Response){
        try{
            const admin_key: string = req.body.admin_key;         
            const user_id: string = req.body.user_id;         
            const feedback: string = req.body.feedback;
            let name: string = req.body.name;
            
            if(admin_key){ 
                throw new Error(Errors.ADMIN_POST_FEEDBACK);
            }

            if(!user_id){ 
                throw new Error(Errors.USER_ID_REQUIRED);
            }

            if(!name) {
                throw new Error(Errors.FEEDBACK_NAME_REQUIRED);       
            }

            if(!feedback) {
                throw new Error(Errors.FEEDBACK_REQUIRED);
            }

            if(feedback.length === 0) {
                throw new Error(Errors.FEEDBACK_EMPTY);
            }

            const user: any = await userService.checkUserExist("user_id", user_id);
            if(user.error) {
                throw new Error(user.error);
            }

            name = controllersUtils.lowerCaseStrings(name);

            let feedback_info: any = {name: name, feedback: feedback, posted_by: user_id};

            const check_user: any = await userService.checkUserExist("name", name);
            
            if(!(check_user.error)) {
                if(check_user.user_id === user_id) {
                    throw new Error(Errors.USER_POST_OWN_FEEDBACK)
                }
                feedback_info.user_id = check_user.user_id;
            } 
            else{
                const check_technology: any = await technologyService.checkTechnologyExist("name", name);
                if(check_technology.error) { 
                    throw new Error(Errors.NAME_NOT_FOUND);
                }    
                feedback_info.technology_id = check_technology.technology_id;
            }
            
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
            const admin_key: string = req.body.admin_key;   
            const user_id: string = req.body.user_id;      
            const feedback_id: string = req.body.feedback_id;         
            const feedback: string = req.body.feedback;         
            
            if(admin_key) {
                throw new Error(Errors.ADMIN_EDIT_FEEDBACK);
            }

            if(!feedback_id) {
                throw new Error(Errors.FEEDBACK_ID_REQUIRED);
            }

            const user: any = await userService.checkUserExist("user_id", user_id);
            if(user.error) {
                throw new Error(user.error); 
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
            const admin_key: string = req.body.admin_key;   
            const feedback_id: string = req.body.feedback_id;         
            let status: string = req.body.status;         
            
            if(!admin_key) {
                throw new Error(Errors.ADMIN_KEY_REQUIRED);
            }

            if(!feedback_id) {
                throw new Error(Errors.FEEDBACK_ID_REQUIRED);
            }

            if(!status) {
                throw new Error(Errors.FEEDBACK_STATUS_REQUIRED);
            }

            status = controllersUtils.lowerCaseStrings(status);
            
            if(!(status === 'approved' || status === 'rejected')) {
                throw new Error(Errors.FEEDBACK_STATUS_INCORRECT);
            }

            const admin: any = await userService.checkUserExist("admin_key", admin_key);
            if(admin.error === Errors.INTERNAL_ERROR){
                throw new Error(admin.error); 
            }
            if(admin.error) {
                throw new Error(Errors.ADMIN_NOT_FOUND); 
            }

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
            const admin_key: string = req.body.admin_key;   
            const feedback_id: string = req.body.feedback_id;         
            let name: string = req.body.name;         
            
            if(admin_key) {
                throw new Error(Errors.ADMIN_EDIT_FEEDBACK);
            }

            if(!feedback_id) {
                throw new Error(Errors.FEEDBACK_ID_REQUIRED);
            }
            
            if(!name) {
                throw new Error(Errors.USER_NAME_REQUIRED);
            }
            
            name = controllersUtils.lowerCaseStrings(name);

            const feedback: any = await feedbackService.checkFeedbackExist("feedback_id", feedback_id);
            if(feedback.error) throw new Error(feedback.error);

            for(let i of feedback.count_users){
                if(i === name){
                    throw new Error(Errors.FEEDBACK_USER_COUNT_EXIST);
                }
            }
            
            const result: any = await feedbackService.editFeedbackCount({feedback_id, count_users: name});
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
            const admin_key: string = req.body.admin_key;         
            const feedback_id: string = req.body.feedback_id;         
            
            if(!admin_key) {
                throw new Error(Errors.ADMIN_KEY_REQUIRED);
            }
            
            if(!feedback_id) {
                throw new Error(Errors.FEEDBACK_ID_REQUIRED);
            }

            const admin: any = await userService.checkUserExist("admin_key", admin_key);
            if(admin.error === Errors.INTERNAL_ERROR){
                throw new Error(admin.error); 
            }
            if(admin.error) {
                throw new Error(Errors.ADMIN_NOT_FOUND); 
            }

            const feedback: any = await feedbackService.checkFeedbackExist("feedback_id", feedback_id);
            if(feedback.error) {
                throw new Error(feedback.error);
            }

            const result: any = await feedbackService.removeFeedback({feedback_id});
            if(result.error) throw new Error(result.error);
            res.status(200);
            res.send(result);
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }
}
