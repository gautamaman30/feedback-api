import express from "express"
import http from "http"
import {RoutesHandler} from "./routes/index"


const app: express.Application = express();
const server: http.Server = http.createServer(app);


app.use(express.json());


const router = new RoutesHandler();
app.use('/api/v1', router.configureRoutes());


const PORT = process.env.PORT || process.argv[2] || 3000;
server.listen(PORT, () => console.log(`server is running at ${PORT}`));