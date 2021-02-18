import {Request, Response} from "express"
import {Service} from "../services/index"
import {convertStringToDate} from "../utils/index"
const service = new Service();


export class Controller{

    getUser(req: Request, res: Response){
        try{
            const user_id = req.query.user_id;
            const name = req.query.name;
            
            let result;
            if(user_id){
                result = service.checkUserExist("user_id", user_id);
                if(result.error) throw new Error(result.error);       
            }
            else if(name){
                result = service.checkUserExist("name", name);
                if(result.error) throw new Error(result.error);
            } 
            else{
                result = service.getAllUsers();
                if(result.error) throw new Error(result.error);
            }
            res.status(200);
            res.send(result);
        } catch(e){
            console.log(e.message);
            res.status(404);
            res.send({error: e.message});
        }
    }

    getTechnology(req: Request, res: Response){
        try{
            const technology_id = req.query.technology_id;
            const name = req.query.name;

            let result;
            
            if(technology_id){
                result = service.checkTechnologyExist("technology_id", technology_id);
                if(result.error) throw new Error(result.error);       
            }
            else if(name){
                result = service.checkTechnologyExist("name", name);
                if(result.error) throw new Error(result.error);
            } 
            else{
                result = service.getAllTechnologies();
                if(result.error) throw new Error(result.error);
            }
            res.status(200);
            res.send(result);
        } catch(e){
            console.log(e.message);
            res.status(404);
            res.send({error: e.message});
        }
    }

    getFeedbacks(req: Request, res: Response){
        try{
            const admin_key = req.body.admin_key;
            const feedback_id = req.query.feedback_id;
            const filter = req.query.name;
            const sort = req.query.sort;
            
            let admin;
            if(admin_key){
                admin = service.checkUserExist("admin_key", admin_key);
                if(admin.error) throw new Error(admin.error);
            } 

            let feedbacks = service.getAllFeedbacks();
                
            if(feedback_id){
                const feedback: any = service.checkFeedbackExist("feedback_id", feedback_id);
                if(feedback.error) throw new Error(feedback.error);

                feedbacks = feedback;     
            }
            else if(filter || sort){
                if(filter){
                    if(filter === "user"){
                        feedbacks = service.filterFeedback(feedbacks, "user_id", []);
                    } else if(filter === "technology"){
                        feedbacks = service.filterFeedback(feedbacks, "technology_id", []);
                    } else if(filter === "status"){
                        feedbacks = service.filterFeedback(feedbacks, "status", ["approved"]);
                    }
                } 
                if(sort){
                    if(sort === "date"){
                        feedbacks = service.sortFeedback(feedbacks, "created_on");
                    } else if(sort === "count"){
                        feedbacks = service.sortFeedback(feedbacks, "count");
                    } 
                }
            } 

            if(!admin){
                feedbacks = service.filterFeedback(feedbacks, "status", ["approved"]);
            }
            res.status(200);
            res.send({"feedbacks": feedbacks});
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    getFeedbacksByUser(req: Request, res: Response){
        try{
            const admin_key: string = req.body.admin_key;  
            const user_id: any = req.query.user_id;

            if(!user_id) throw new Error("User id is required");

            let admin;
            if(admin_key){
                admin = service.checkUserExist("admin_key", admin_key);
                if(admin.error) throw new Error(admin.error);
            }

            const user: any = service.checkUserExist("user_id", user_id);
            if(user.error) throw new Error(user.error);

            let feedbacks = service.getAllFeedbacks();
            feedbacks = service.filterFeedback(feedbacks, "posted_by", [user_id]);

            if(!admin){
                feedbacks = service.filterFeedback(feedbacks, "status", ['approved']);
            }

            res.status(200);
            res.send({"feedbacks": feedbacks});
        } catch(e){
            console.log(e.message);
            res.status(404);
            res.send({error: e.message});
        }
    }

    postUser(req: Request, res: Response){
        try{
            const admin_key: string = req.body.admin_key; 
            const name: string = req.body.name;        

            if(!admin_key) throw new Error("Admin key is required, only admins can add new users ");

            if(!name) throw new Error("User name is required");

            const admin: any = service.checkUserExist("admin_key", admin_key);
            if(admin.error) throw new Error(admin.error);
            
            const user: any = service.checkUserExist("name", name);
            if(user.error) throw new Error(user.error);

            let result: any;
            let user_info: any = {name: name};

            if(req.body.email) user_info.email = req.body.email;
            if(req.body.title) user_info.title = req.body.title;
            if(req.body.date_of_birth) {
                let date = convertStringToDate(req.body.date_of_birth);
                if(!date) throw new Error("Wrong date, only accepted format is 'YYYY-MM-DD'");
                user_info.date_of_birth = req.body.date;
            }    

            result = service.addUser(user_info);
            if(result.error) throw new Error(result.error);

            res.status(201);
            res.send(result);
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    postTechnology(req: Request, res: Response){
        try{
            const admin_key: string = req.body.admin_key; 
            const name: string = req.body.name;
            
            if(!admin_key) throw new Error("Admin key is required, only admins can add new technologies");

            if(!name) throw new Error("Technology name is required");
            
            const admin: any = service.checkUserExist("admin_key", admin_key);
            if(admin.error) throw new Error(admin.error);
            
            const technology: any = service.checkTechnologyExist("name", name);
            if(technology.error) throw new Error(technology.error);
            
            let result: any;
            if(req.body.details){
                const details: string = req.body.details;
                result = service.addTechnology({name, details});
            }  
            else  result = service.addTechnology({name});

            if(result.error) throw new Error(result.error);
            
            res.status(201);
            res.send(result);
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    postFeedback(req: Request, res: Response){
        try{
            const admin_key: string = req.body.admin_key;         
            const user_id: string = req.body.user_id;         
            const name: string = req.body.name;
            const feedback: string = req.body.feedback;
            
            if(admin_key) throw new Error("Only users can add new feedbacks");

            if(!user_id) throw new Error("User id is required");
            
            if(!name) throw new Error("Feedback name is required");       
            
            if(!feedback)  throw new Error("Feedback is required");

            if(feedback.length === 0) throw new Error("Feedback cannot be empty");

            const user: any = service.checkUserExist("user_id", user_id);
            if(user.error) throw new Error(user.error);

            let feedback_info: any = {name: name, feedback: feedback, posted_by: user_id};

            const check_user: any = service.checkUserExist("name", name);
            if(!(check_user.error)) {
                if(check_user.user_id === user_id) throw new Error("User cannot post feedbacks about themselves")
                feedback_info.user_id = check_user.user_id;
            } 
            else{
                const check_technology: any = service.checkTechnologyExist("name", name);
                if(check_technology.error) throw new Error("Name not found");
                feedback_info.technology_id = check_user.check_technology;
            }
            
            const result: any = service.addFeedback(feedback_info);
            if(result.error) throw new Error(result.error);
            
            res.status(201);
            res.send(result);
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    updateTechnology(req: Request, res: Response){
        try{
            const admin_key: string = req.body.admin_key;         

            if(!admin_key) throw new Error("Admin key is required, only admins can update technologies");

            if(!req.body.name) throw new Error("Technology name is required");
            
            if(!req.body.details) throw new Error("Technology details is required");

            const admin: any = service.checkUserExist("admin_key", admin_key);
            if(admin.error) throw new Error(admin.error);           
            
            const technology: any = service.checkTechnologyExist("name", req.body.name);
            if(technology.error) throw new Error(technology.error);
                
            const result: any = service.editTechnology(req.body);
            if(result.error) throw new Error(result.error);

            res.status(200);
            res.send(result);
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    updateFeedback(req: Request, res: Response){
        try{
            const admin_key: string = req.body.admin_key;   
            const user_id: string = req.body.user_id;      
            const feedback_id: string = req.body.feedback_id;         
            const feedback: string = req.body.feedback;         
            
            if(admin_key) throw new Error("Only users can edit their feedback");
            
            if(!feedback_id) throw new Error("Feedback id is required");

            const user: any = service.checkUserExist("user_id", user_id);
            if(user.error) throw new Error(user.error); 

            const check_feedback: any = service.checkFeedbackExist("feedback_id", feedback_id);
            if(check_feedback.error) throw new Error(check_feedback.error);

            if(check_feedback.posted_by !== user.user_id) throw new Error("User cannot update other user's feedbacks");
            
            const result: any = service.editFeedback({feedback_id, feedback});
            if(result.error) throw new Error(result.error);

            res.status(200);
            res.send(result);
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    updateFeedbackStatus(req: Request, res: Response){
        try{
            const admin_key: string = req.body.admin_key;   
            const feedback_id: string = req.body.feedback_id;         
            const status: string = req.body.status;         
            
            if(!admin_key) throw new Error("Admin key is required, only admin can change feedback's status");
            
            if(!feedback_id) throw new Error("Feedback id is required");

            if(!status) throw new Error("Status is required");
            if(!(status === 'approved' || status === 'rejected')) throw new Error("Status can be 'approved' or 'rejected' only");

            const admin: any = service.checkUserExist("admin_key", admin_key);
            if(admin.error) throw new Error(admin.error); 

            const feedback: any = service.editFeedbackStatus({feedback_id, status});
            if(feedback.error) throw new Error(feedback.error);

            res.status(200);
            res.send(feedback);
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    deleteUser(req: Request, res: Response){
        try{

            const admin_key: string = req.body.admin_key;  
            const user_id: string = req.body.user_id;       

            if(!admin_key) throw new Error("Admin key is required, only admins can delete users");
            
            if(!user_id) throw new Error("User id is required");

            const admin: any = service.checkUserExist("admin_key", admin_key);
            if(admin.error) throw new Error(admin.error);
            
            const user: any = service.checkUserExist("name", user_id);
            if(user.error) throw new Error(user.error);

            if(user.admin_key) throw new Error("Admin cannot delete another admin");
            
            const result: any = service.removeUser({user_id});
            if(result.error) throw new Error(result.error);

            res.status(200);
            res.send(result);
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    } 
    
    deleteTechnology(req: Request, res: Response){
        try{

            const admin_key: string = req.body.admin_key;
            const name: string = req.body.name;         

            if(!admin_key) throw new Error("Admin key is required, only admins can delete technologies");
            
            if(!name) throw new Error("Technology name is required");

            const admin: any = service.checkUserExist("admin_key", admin_key);
            if(admin.error) throw new Error(admin.error);
            
            const technology: any = service.checkTechnologyExist("name", name);
            if(technology.error) throw new Error(technology.error);

            const result: any = service.removeTechnology({name});
            if(result.error) throw new Error(result.error);

            res.status(200);
            res.send(result);
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    deleteFeedback(req: Request, res: Response){
        try{
            const admin_key: string = req.body.admin_key;         
            const feedback_id: string = req.body.feedback_id;         
            
            if(!admin_key) throw new Error("Admin key is required, only admins can delete technologies");
            
            if(!feedback_id) throw new Error("Feedback id is required");

            const admin: any = service.checkUserExist("admin_key", admin_key);
            if(admin.error) throw new Error(admin.error);

            const feedback: any = service.checkFeedbackExist("feedback_id", feedback_id);
            if(feedback.error) throw new Error(feedback.error);

            const result: any = service.removeFeedback({feedback_id});
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
