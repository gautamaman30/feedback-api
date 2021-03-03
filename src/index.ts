import express from "express"
import http from "http"
import {RoutesHandler} from "./routes/index"
import configObj from "./config"


const app: express.Application = express();
const server: http.Server = http.createServer(app);


app.use(express.json());


const router = new RoutesHandler();
app.use('/api/v1', router.configureRoutes());


server.listen(configObj.PORT, () => console.log(`server is running at ${configObj.PORT}`));
