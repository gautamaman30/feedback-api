import {users, feedbacks, technologies} from '../models/index'
import {User, Feedback, Technology} from '../models/index'
import {generateId, convertArrayToSet} from '../utils/index'


export class Service{

    getAllUsers(){
        return users;
    } 

    getAllTechnologies(){
        return technologies;
    } 

    getAllFeedbacks(){
        return feedbacks;
    }

    editFeedbackStatus(feedback_info: {feedback_id: string, status: "approved" | "rejected"}){
        for(let i = 0; i < feedbacks.length ; i++){
            if(feedbacks[i].feedback_id === feedback_info.feedback_id){
                feedbacks[i].status = feedback_info.status;
                return feedbacks[i];
            }
        }
        return {error: "Feedback not found"};
    }

    removeFeedback(feedback_info: {feedback_id: string}){
        for(let i = 0; i < feedbacks.length ; i++){
            if(feedbacks[i].feedback_id === feedback_info.feedback_id){
                feedbacks.splice(i,1);
                return {message: "Feedback deleted successfully"};
            }
        }
        return {error: "Feedback not found"};
    }

    editFeedback(feedback_info: {feedback_id: string, feedback: string}){
        for(let i = 0; i < feedbacks.length ; i++){
            if(feedbacks[i].feedback_id === feedback_info.feedback_id){
                feedbacks[i].feedback = feedback_info.feedback;
                return feedbacks[i];
            }
        }
        return {error: "Feedback not found"};
    }

    removeTechnology(technology_info: {name: string}){
        for(let i = 0; i < technologies.length ; i++){
            if(technologies[i].name === technology_info.name){
                technologies.splice(i,1);
                return {message: "Technology deleted successfully"};
            }
        }
        return {error: "Technology not found"};
    }

    removeUser(user_info: {user_id: string}){
        for(let i = 0; i < users.length ; i++){
            if(users[i].user_id === user_info.user_id){
                users.splice(i,1);
                return {message: "User deleted successfully"}
            }
        }
        return {error: "User not found"};
    }

    editTechnology(technology_info: {name: string, details: string}){
        for(let i = 0; i < technologies.length ; i++){
            if(technologies[i].name === technology_info.name){
                technologies[i].details = technology_info.details;
                return technologies[i];
            }
        }
        return {error: "Technology not found"};
    }

    checkUserExist(key: string, value: any){
        for(let i = 0; i < users.length; i++){
            if(users[i][key] === value){
                return users[i];
            }
        }
        return {error: "User not found"};
    }

    checkTechnologyExist(key: string, value: any){
        for(let i = 0; i < technologies.length; i++){
            if(technologies[i][key] === value){
                return technologies[i];
            }
        }
        return {error: "Technology not found"};;
    }

    checkFeedbackExist(key: string, value: any){
        for(let i = 0; i < feedbacks.length; i++){
            if(feedbacks[i][key] === value){
                return feedbacks[i];
            }
        }
        return {error: "Feedback not found"};;
    }

    addUser(user_info: {name: string, email?: string, title?: string, date_of_birth?: Date}){
        let user: User;
        user = {
            user_id: generateId(),
            name: user_info.name,
        }
        if(user_info.email) user.email = user_info.email;
        if(user_info.title) user.title = user_info.title;
        if(user_info.date_of_birth) user.date_of_birth = user_info.date_of_birth;

        users.push(user);
        return user;
    }

    addTechnology(technology_info: {name: string, details?: string}){
        let technology: Technology;
        technology = {
            technology_id: generateId(),
            name: technology_info.name,
        }
        if(technology_info.details) technology.details = technology_info.details;

        technologies.push(technology);
        return technology;
    }

    addFeedback(feedback_info: {name: string, posted_by: string, feedback: string, user_id?: string, technology_id?: string}){

        let new_feedback: Feedback;
        
        if(feedback_info.user_id){
            new_feedback = {
                feedback_id: generateId(),
                posted_by: feedback_info.posted_by,
                name: feedback_info.name,
                user_id: feedback_info.user_id,
                feedback: feedback_info.feedback,
                status: 'waiting',
                created_on: new Date(),
                count: 0
            }
        } else {
            new_feedback = {
                feedback_id: generateId(),
                posted_by: feedback_info.posted_by,
                name: feedback_info.name,
                technology_id: feedback_info.technology_id,
                feedback: feedback_info.feedback,
                status: 'waiting',
                created_on: new Date(),
                count: 0
            }
        }    
        feedbacks.push(new_feedback);
        return new_feedback;
    }

    filterFeedback(feedback_array: Array<Feedback>, key: string, values: string[]){
        let set = convertArrayToSet(values);
        return feedback_array.filter((item) => item[key] && set.has(item[key])? true: false);
    }

    sortFeedback(feedback_array: Array<Feedback>, key: string){
        return feedback_array.sort((a , b) => {
            if(key === "created_on"){
                return b.created_on.getMilliseconds() - a.created_on.getMilliseconds();  
            } 
            if(key === "count"){
                return b.count - a.count;
            } 
            return 0;
        });
    }
}
