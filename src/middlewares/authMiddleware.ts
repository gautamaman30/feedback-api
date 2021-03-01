import { Request, Response, NextFunction} from "express"
import jwt, { Secret } from "jsonwebtoken"
import { Errors } from "../utils/index"


export class AuthMiddleware{

    signToken(req: Request, res: Response, next: NextFunction){
        const signOptions: any = {
            issuer: process.env.JWT_TOKEN_ISSUER,
            expiresIn: process.env.JWT_TOKEN_EXPIRES_IN,
            algorithm: process.env.JWT_TOKEN_ALGORITHM
        }

        const key: any = process.env.SECRET_KEY;
        let payload: any = JSON.parse(res.get("payload"));

        jwt.sign(payload, <Secret>key , signOptions , function(err, token) {
            if(err){
              console.log(err);
              res.status(500);
              res.send({error: Errors.INTERNAL_ERROR});
            }
            if(token){
              console.log(token);
              if(res.get("password")){
                  let password: string = res.get("password");
                  res.set("password", '');
                  res.send({password, token})
              }
              res.send({token});
            }
        });
    }

    verifyToken(req: Request, res: Response, next: NextFunction){

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
                req.body.user_id = result.user_id;
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

    checkUnknownRoutes(req: Request, res: Response){
        res.status(404);
        res.send({errors: Errors.BAD_REQUEST});
    }
}
