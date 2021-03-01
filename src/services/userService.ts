import { Database } from '../models/index'
import {Errors, Messages, helperFunctions } from '../utils/index'


const database = new Database();


export default class UserService{
    async getAllUsers(){
        try{
            let result = await database.findAll('users');
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            result = result.filter(item => !item.admin_key);
            return result;
        } catch(err) {
            console.log(err);
            return {error: Errors.INTERNAL_ERROR};
        }
    }

    async getUsers(key: string, value: any){

        try{
            let user_info: any = {};
            user_info[key] = value;

            const result = await database.findUsers(user_info);

            if(!result){
                throw new Error(Errors.USER_NOT_FOUND);
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

    async removeUser(user_info: {email: string}){
        try{
            const result = await database.deleteUser({ email: user_info.email });

            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(result.deletedCount !== 1){
                throw new Error(Errors.USER_NOT_FOUND);
            }
            return {message: Messages.USER_DELETED};
        } catch(err) {
            console.log(err);
            return {error: err.message};
        }
    }

    async checkUserExist(key: string, value: any){

        try{
            let user_info: any = {};
            user_info[key] = value;

            const result = await database.findUser(user_info);

            if(!result){
                throw new Error(Errors.USER_NOT_FOUND);
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

    async checkAdminExist(key: string, value: any){

        try{
            let user_info: any = {};
            user_info[key] = value;

            const result = await database.findUser(user_info);

            if(!result){
                throw new Error(Errors.ADMIN_NOT_FOUND);
            }
            if(result.error){
                throw new Error(Errors.INTERNAL_ERROR);
            }
            if(result.roles !== "admin"){
                throw new Error(Errors.NOT_ADMIN);
            }
            return result;
        } catch(err) {
            console.log(err);
            return {error: err.message};
        }
    }

    async addUser(user_info: {name: string, email: string, title?: string, date_of_birth?: Date}){

        try{
            let user: any;
            user = {
                user_id: helperFunctions.generateId(),
                name: user_info.name,
                email: user_info.email
            }

            if(user_info.title) user.title = user_info.title;
            if(user_info.date_of_birth) user.date_of_birth = user_info.date_of_birth;

            const result = await database.insertUser(user);

            if(result.error || result.insertedCount < 1){
                throw new Error(Errors.INTERNAL_ERROR);
            }

            return user;
        } catch(err) {
            console.log(err);
            return {error: err.message};
        }

    }

}
