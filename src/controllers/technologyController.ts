import {Request, Response } from "express"
import {userService, technologyService } from "../services/index"
import { helperFunctions, Errors} from "../utils/index"


export default class TechnologyController{

    async getTechnology(req: Request, res: Response){
        try{
            const technology_id = req.query.technology_id;
            const name: any = req.query.name;

            let result;
            
            if(technology_id){
                result = await technologyService.checkTechnologyExist("technology_id", technology_id);
                if(result.error) throw new Error(result.error);       
            }
            else if(name){
                result = await technologyService.checkTechnologyExist("name", helperFunctions.lowerCaseStrings(name));
                if(result.error) throw new Error(result.error);
            } 
            else{
                result = await technologyService.getAllTechnologies();
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

    async postTechnology(req: Request, res: Response){
        try{
            const admin_key: string = req.body.admin_key; 
            let name: string = req.body.name;
            let details: string = req.body.details;
            
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
            const technology: any = await technologyService.checkTechnologyExist("name", name);
            if(technology.error === Errors.INTERNAL_ERROR) { 
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(technology.technology_id) { 
                throw new Error(Errors.DUPLICATE_TECHNOLOGY);
            }

            let result: any;
            result = await technologyService.addTechnology({name, details});
            
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

    async updateTechnology(req: Request, res: Response){
        try{
            const admin_key: string = req.body.admin_key;  
            let name: string = req.body.name;
            let details: string = req.body.details;       

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

            name = helperFunctions.lowerCaseStrings(name);

            const technology: any = await technologyService.checkTechnologyExist("name", name);
            if(technology.error) {
                throw new Error(technology.error);
            }

            const result: any = await technologyService.editTechnology({name, details});
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

    async deleteTechnology(req: Request, res: Response){
        try{

            const admin_key: string = req.body.admin_key;
            let name: string = req.body.name;         

            if(!admin_key) {
                throw new Error(Errors.ADMIN_KEY_REQUIRED);
            }

            if(!name) {
                throw new Error(Errors.TECHNOLOGY_NAME_REQUIRED);
            }

            const admin: any = await userService.checkUserExist("admin_key", admin_key);
            if(admin.error === Errors.INTERNAL_ERROR) { 
                throw new Error(admin.error);
            }
            if(admin.error) { 
                throw new Error(Errors.ADMIN_NOT_FOUND);
            }

            name = helperFunctions.lowerCaseStrings(name);

            const technology: any = await technologyService.checkTechnologyExist("name", name);
            if(technology.error) {
                throw new Error(technology.error);
            }

            const result: any = await technologyService.removeTechnology({name});
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
