"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const index_1 = require("./routes/index");
const config_1 = __importDefault(require("./config"));
const app = express_1.default();
const server = http_1.default.createServer(app);
app.use(express_1.default.json());
const router = new index_1.RoutesHandler();
app.use('/api/v1', router.configureRoutes());
server.listen(config_1.default.PORT, () => console.log(`server is running at ${config_1.default.PORT}`));
