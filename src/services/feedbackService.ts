import { Database } from '../models/index'
import {Errors, Messages, helperFunctions } from '../utils/index'


const database = new Database();


export default class FeedbackService{
    async getAllFeedbacks(){
        try{
            const result = await database.findAll('feedbacks');
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            return result;
        } catch(err) {
            console.log(err);
            return {error: Errors.INTERNAL_ERROR};
        }
    }

    async getFeedbacks(filter){
        try{
            let query: any = filter;
            const result = await database.findFeedbacks(query);
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            return result;
        } catch(err) {
            console.log(err);
            return {error: Errors.INTERNAL_ERROR};
        }
    }

    async getFilteredAndSortedFeedbacks(filter, sort){
        try{
            let query: any = {};
            if(filter === "status"){
                query[filter] = "approved";
            }
            else{
                query[filter] = { '$exists': true};
            }

            let sortField: any = {};
            sortField[sort] = -1;

            const result = await database.findFeedbacksSorted(query, sortField);
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            return result;
        } catch(err) {
            console.log(err);
            return {error: Errors.INTERNAL_ERROR};
        }
    }

    async getSortedFeedbacks(sort){
        try{
            let sortField: any = {};
            sortField[sort] = -1;

            const result = await database.findFeedbacksSorted({}, sortField);
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }

            return result;
        } catch(err) {
            console.log(err);
            return {error: Errors.INTERNAL_ERROR};
        }
    }

    async getFilteredFeedbacks(filter){
        try{
            let query: any = {};
            if(filter === "status"){
                query[filter] = "approved";
            }
            else{
                query[filter] = { '$exists': true};
            }
            const result = await database.findFeedbacks(query);
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            return result;
        } catch(err) {
            console.log(err);
            return {error: Errors.INTERNAL_ERROR};
        }
    }

    async editFeedbackStatus(feedback_info: {feedback_id: string, status: "approved" | "rejected"}){

        try{
            const result = await database.updateFeedback({ feedback_id: feedback_info.feedback_id }, { $set: {status: feedback_info.status }});

            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(result.matchedCount < 1){
                throw new Error(Errors.FEEDBACK_NOT_FOUND);
            }
            return {message: Messages.FEEDBACK_UPDATED};
        } catch(err) {
            console.log(err);
            return {error: err.message};
        }
    }

    async editFeedbackCount(feedback_info: {feedback_id: string, count_users: string}){

        try{
            const result = await database.updateFeedback({ feedback_id: feedback_info.feedback_id }, { $push : { count_users: feedback_info.count_users }, $inc: {count: 1}});

            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(result.matchedCount < 1){
                throw new Error(Errors.FEEDBACK_NOT_FOUND);
            }
            return {message: Messages.FEEDBACK_UPDATED};
        } catch(err) {
            console.log(err);
            return {error: err.message};
        }
    }

    async editFeedback(feedback_info: {feedback_id: string, feedback: string}){
        try{
            const result = await database.updateFeedback({ feedback_id: feedback_info.feedback_id }, { $set: {feedback: feedback_info.feedback }});

            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(result.matchedCount < 1){
                throw new Error(Errors.FEEDBACK_NOT_FOUND);
            }
            return {message: Messages.FEEDBACK_UPDATED};
        } catch(err) {
            console.log(err);
            return {error: err.message};
        }
    }

    async removeFeedback(feedback_info: {feedback_id: string}){

        try{
            const result = await database.deleteFeedback({ feedback_id: feedback_info.feedback_id });

            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(result.deletedCount !== 1){
                throw new Error(Errors.FEEDBACK_NOT_FOUND);
            }
            return {message: Messages.FEEDBACK_DELETED};
        } catch(err) {
            console.log(err);
            return {error: err.message};
        }
    }

    async checkFeedbackExist(key: string, value: any){
        try{
            let feedback_info: any = {};
            feedback_info[key] = value;

            const result = await database.findFeedback(feedback_info);
            if(!result){
                throw new Error(Errors.FEEDBACK_NOT_FOUND);
            }
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            return result;
        } catch(err) {
            console.log(err);
            return {error: err.message};
        }
    }

    async addFeedback(feedback_info: {name: string, posted_by: string, feedback: string, user_id?: string, technology_id?: string}){

        try{
            let new_feedback: any;

            if(feedback_info.user_id){
                new_feedback = {
                    feedback_id: helperFunctions.generateId(),
                    posted_by: feedback_info.posted_by,
                    name: feedback_info.name,
                    user_id: feedback_info.user_id,
                    feedback: feedback_info.feedback,
                    status: 'waiting',
                    created_on: new Date(),
                    count: 0,
                    count_users: []
                }
            } else {
                new_feedback = {
                    feedback_id: helperFunctions.generateId(),
                    posted_by: feedback_info.posted_by,
                    name: feedback_info.name,
                    technology_id: feedback_info.technology_id,
                    feedback: feedback_info.feedback,
                    status: 'waiting',
                    created_on: new Date(),
                    count: 0,
                    count_users: []
                }
            }

            const result = await database.insertFeedback(new_feedback);

            if(result.error || result.insertedCount < 1){
                throw new Error(Errors.INTERNAL_ERROR);
            }

            return {message: Messages.FEEDBACK_CREATED};
        } catch(err) {
            console.log(err);
            return {error: err.message};
        }
    }

    filterFeedback(feedback_array: Array<any>, key: string, values: string[]) {
        let set = helperFunctions.convertArrayToSet(values);
        return feedback_array.filter((item) => item[key] && set.has(item[key])? true: false);
    }
}
