import { join } from "path"
import dotenv from "dotenv"


dotenv.config({
    path: join(process.cwd(), `${process.env.NODE_ENV}.env`)
})


const configObj = {
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    SECRET_KEY: process.env.SECRET_KEY,
    JWT_TOKEN_ISSUER: process.env.JWT_TOKEN_ISSUER,
    JWT_TOKEN_EXPIRES_IN: process.env.JWT_TOKEN_EXPIRES_IN,
    JWT_TOKEN_ALGORITHM: process.env.JWT_TOKEN_ALGORITHM,
    DB_URL: process.env.DB_URL,
    DB_NAME: process.env.DB_NAME
}

export default configObj;
