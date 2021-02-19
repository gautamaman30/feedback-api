import {Request, Response, NextFunction} from "express"
import jwt, { Secret } from "jsonwebtoken"
import path from "path"
import {readFile} from "../utils/index"


export class Middleware{

    signToken(req: Request, res: Response){
        const file_path: string = path.join(process.cwd(),'/authKeys/id_rsa');
        const signOptions: any = {
            issuer: 'crownstack',
            expiresIn: '24h',
            algorithm: 'RS256'
        }
        readFile(file_path).then((key) => { 

            jwt.sign({user_id: res.get("user_id")}, <Secret>key, signOptions ,function(err, result) {
                if(err){
                    console.log(err);
                }
                if(result){
                    console.log(result);
                    const obj: any = {
                        user_id: res.get("user_id"),
                        name: res.get("name"),
                        token: result
                    }
                    res.send(obj);
                }
            });

        }).catch(err => {
            console.log(err);
            res.status(500);
            res.send({error: "Internal error"});
        });  
    }

    verifyToken(req: Request, res: Response, next: NextFunction){
        if(req.body.admin_key){
            return next();
        }
        const file_path: string = path.join(process.cwd(),'/authKeys/id_rsa.pub');

        let token: any;
        if(req.headers.authorization){
            token = req.headers.authorization.split(' ')[1];
        }
        readFile(file_path).then((key) => {

            jwt.verify(token, <Secret>key, function(err, result) {
                if(err){
                    console.log(err);
                    res.status(401);
                    res.send({error: "Authorization failed"});
                }
                if(result) next();
            });

        }).catch(err => {
            console.log(err);
            res.status(500);
            res.send({error: "Internal error"});
        });  
    }

}