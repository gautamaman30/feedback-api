import express from "express"
import http from "http"
import path from "path"
import {RoutesHandler} from "./routes/index"
import {config} from "dotenv"


config({path: path.join(process.cwd(),'/.env')});


const app: express.Application = express();
const server: http.Server = http.createServer(app);


app.use(express.json());


new RoutesHandler(app).configureRoutes();


const PORT = process.env.PORT || process.argv[2] || 3000;
server.listen(PORT, () => console.log(`server is running at ${PORT}`));