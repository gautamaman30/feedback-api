import {Request, Response, NextFunction} from "express"
import { userService } from "../services/index"
import { helperFunctions, Errors} from "../utils/index"


export default class UserController{

    async getUser(req: Request, res: Response){
        try{
            const user_id = req.query.user_id;
            const name: any = req.query.name;
            
            let result;
            if(user_id){
                result = await userService.checkUserExist("user_id", user_id);
                if(result.error) throw new Error(result.error);       
            }
            else if(name){ 
                result = await userService.checkUserExist("name", helperFunctions.lowerCaseStrings(name));
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
            let name: string = req.body.name;   
            let email: string = req.body.email;
            let title: string = req.body.title;
            let date_of_birth: Date = req.body.date_of_birth;

            if(!admin_key) {
                throw new Error(Errors.ADMIN_KEY_REQUIRED);
            }
            
            const admin: any = await userService.checkUserExist("admin_key", admin_key);           
            if(admin.error === Errors.INTERNAL_ERROR) {
                throw new Error(admin.error);
            }
            if(admin.error) {
                throw new Error(Errors.ADMIN_NOT_FOUND);
            }  
            
            name = name.toLowerCase();
            const user: any = await userService.checkUserExist("name", name);
            if(user.error === Errors.INTERNAL_ERROR) { 
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(user.user_id) { 
                throw new Error(Errors.DUPLICATE_USER_NAME);
            }

            let result: any;
            let user_info: any = {name, email, title, date_of_birth};

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

            const user: any = await userService.checkUserExist("user_id", user_id);
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
