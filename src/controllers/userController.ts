import {Request, Response, NextFunction} from "express"
import { userService } from "../services/index"
import {convertStringToDate, Errors} from "../utils/index"


export default class UserController{

    async getUser(req: Request, res: Response){
        try{
            const user_id = req.query.user_id;
            const name = req.query.name;
            
            let result;
            if(user_id){
                result = await userService.checkUserExist("user_id", user_id);
                if(result.error) throw new Error(result.error);       
            }
            else if(name){
                result = await userService.checkUserExist("name", name);
                if(result.error) throw new Error(result.error);
            } 
            else{
                result = await userService.getAllUsers();
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
   
    async postUser(req: Request, res: Response, next: NextFunction){
        try{
            const admin_key: string = req.body.admin_key; 
            const name: string = req.body.name;        

            if(!admin_key) {
                throw new Error(Errors.ADMIN_KEY_REQUIRED);
            }

            if(!name) {
                throw new Error(Errors.USER_NAME_REQUIRED);
            } 

            const admin: any = await userService.checkUserExist("admin_key", admin_key);           
            if(admin.error) {
                throw new Error(admin.error);
            }

            const user: any = await userService.checkUserExist("name", name);
            if(user.user_id) { 
                throw new Error(Errors.DUPLICATE_USER_NAME);
            }

            let result: any;
            let user_info: any = {name: name};

            if(req.body.email){ 
                user_info.email = req.body.email;
            }

            if(req.body.title) {
                user_info.title = req.body.title;
            }

            if(req.body.date_of_birth) {
                let date = convertStringToDate(req.body.date_of_birth);
                if(!date) throw new Error(Errors.DATE_FORMAT_INCORRECT);
                user_info.date_of_birth = req.body.date;
            }    

            result = await userService.addUser(user_info);
            if(result.error) throw new Error(result.error);
            
            res.setHeader("user_id", result.user_id);
            res.setHeader("name", result.name);
            res.status(201);
            next();
        } catch(e){
            console.log(e.message);
            res.status(400);
            res.send({error: e.message});
        }
    }

    async deleteUser(req: Request, res: Response){
        try{

            const admin_key: string = req.body.admin_key;  
            const user_id: string = req.body.user_id;       

            if(!admin_key) {
                throw new Error(Errors.ADMIN_KEY_REQUIRED);
            }

            if(!user_id) {
                throw new Error(Errors.USER_ID_REQUIRED);
            }    

            const admin: any = await userService.checkUserExist("admin_key", admin_key);
            if(admin.error) {
                throw new Error(admin.error);
            }

            const user: any = await userService.checkUserExist("name", user_id);
            if(user.error) {
                throw new Error(user.error);
            }

            if(user.admin_key) {
                throw new Error(Errors.ADMIN_DELETE_ADMIN);
            }

            const result: any = await userService.removeUser({user_id});
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
