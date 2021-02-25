import { Request, Response, NextFunction} from "express"
import jwt, { Secret } from "jsonwebtoken"
import { Errors } from "../utils/index"


export class Middleware{

    signToken(req: Request, res: Response){

        const signOptions: any = {
            issuer: process.env.JWT_TOKEN_ISSUER,
            expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
            algorithm: process.env.JWT_TOKEN_ALGORITHM
        }
        let obj: any = {
            user_id: res.get("user_id"),
            name: res.get("name")
        }
        const key: any = process.env.SECRET_KEY;
        
        jwt.sign(obj, <Secret>key , signOptions , function(err, result) {
            if(err){
                console.log(err);
                res.status(500);
                res.send({error: Errors.INTERNAL_ERROR});
            }
            if(result){
                console.log(result);
                obj.token = result;
                res.send(obj);
            }
        });
    }

    verifyToken(req: Request, res: Response, next: NextFunction){
        if(req.body.admin_key){
            return next();
        }
        
        let token: any;
        if(req.headers.authorization){
            token = req.headers.authorization.split(' ')[1];
        }
        
        jwt.verify(token, <Secret>process.env.SECRET_KEY, function(err, result) {
            if(err){
                console.log(err);
                res.status(401);
                res.send({error: Errors.AUTHORIZATION_FAILED});
            }
            if(result){ 
                return next();
            }    
        });
    }

    checkRequestKeys(req: Request, res: Response, next: NextFunction){
        let body = req.body;
        for(let key in body){
            req.body[key.toLowerCase()] = body[key];
        }
        return next();
    }
}