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
                result = await technologyService.checkTechnologyExist("name", name.toLowerCase());
                if(result.error) throw new Error(result.error);
            }
            else{
                result = await technologyService.getAllTechnologies();
                if(result.error) throw new Error(result.error);
            }
            result = helperFunctions.removeSensitiveData(result);

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
            const admin_id: string = req.body.user_id;
            let name: string = req.body.name;
            let details: string = req.body.details;

            const admin: any = await userService.checkAdminExist("user_id", admin_id);
            if(admin.error) {
                throw new Error(admin.error);
            }

            name = name.toLowerCase();
            const technology: any = await technologyService.checkTechnologyExist("name", name);
            if(technology.error === Errors.INTERNAL_ERROR) {
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(technology.technology_id) {
                throw new Error(Errors.DUPLICATE_TECHNOLOGY);
            }

            let result: any = await technologyService.addTechnology({name, details});
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
            const admin_id: string = req.body.user_id;
            let name: string = req.body.name;
            let details: string = req.body.details;

            const admin: any = await userService.checkAdminExist("user_id", admin_id);
            if(admin.error) {
                throw new Error(admin.error);
            }

            name = name.toLowerCase();
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
            const admin_id: string = req.body.user_id;
            let name: string = req.body.name;

            const admin: any = await userService.checkAdminExist("user_id", admin_id);
            if(admin.error) {
                throw new Error(admin.error);
            }

            name = name.toLowerCase();
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
