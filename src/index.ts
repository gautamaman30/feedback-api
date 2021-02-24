import express from "express"
import http from "http"
import {RoutesHandler} from "./routes/index"


const app: express.Application = express();
const server: http.Server = http.createServer(app);


app.use(express.json());


new RoutesHandler(app).configureRoutes();


const PORT = process.env.PORT || process.argv[2] || 3000;
server.listen(PORT, () => console.log(`server is running at ${PORT}`));