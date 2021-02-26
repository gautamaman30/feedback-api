import { Database } from '../models/index'
import {Errors, Messages, helperFunctions} from '../utils/index'


const database = new Database();


export default class TechnologyService{


    async getAllTechnologies(){
        try{
            const result = await database.findAll('technologies');
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            return result;
        } catch(err) {
            console.log(err);
            return {error: Errors.INTERNAL_ERROR};
        }
    } 

  

    async editTechnology(technology_info: {name: string, details: string}){
        try{
            const result = await database.updateTechnology({ name: technology_info.name }, { details: technology_info.details });

            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(result.matchedCount < 1){
                throw new Error(Errors.TECHNOLOGY_NOT_FOUND);
            }
            return {message: Messages.TECHNOLOGY_UPDATED};
        } catch(err) {
            console.log(err);
            return {error: err.message};
        }
    }

    
    async removeTechnology(technology_info: {name: string}){

        try{
            const result = await database.deleteTechnology({ name: technology_info.name });

            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(result.deletedCount !== 1){
                throw new Error(Errors.TECHNOLOGY_NOT_FOUND);
            }
            return {message: Messages.TECHNOLOGY_DELETED};
        } catch(err) {
            console.log(err);
            return {error: err.message};
        }
    }

  

    async checkTechnologyExist(key: string, value: any){
        try{
            let technology_info: any = {};
            technology_info[key] = value;
           
            const result = await database.findTechnology(technology_info);

            if(!result){
                throw new Error(Errors.TECHNOLOGY_NOT_FOUND);
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

   
    async addTechnology(technology_info: {name: string, details?: string}){
        try{
            let technology: any;
            technology = {
                technology_id: helperFunctions.generateId(),
                name: technology_info.name,
            }
            if(technology_info.details) technology.details = technology_info.details;

            const result = await database.insertTechnology(technology);

            if(result.error || result.insertedCount < 1){
                throw new Error(Errors.INTERNAL_ERROR);
            }

            return {message: Messages.TECHNOLOGY_CREATED};
        } catch(err) {
            console.log(err);
            return {error: err.message};
        }   
    }

   
}
