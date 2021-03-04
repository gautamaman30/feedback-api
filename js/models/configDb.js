"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectDb = void 0;
const mongodb_1 = require("mongodb");
const config_1 = __importDefault(require("../config"));
class ConnectDb {
    constructor() {
        this.getDb = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.client.isConnected()) {
                yield this.client.connect();
            }
            return this.client.db(this.db_name);
        });
        this.url = config_1.default.DB_URL;
        this.db_name = config_1.default.DB_NAME;
        this.client = new mongodb_1.MongoClient(this.url, { useNewUrlParser: true, useUnifiedTopology: true });
    }
    ;
}
exports.ConnectDb = ConnectDb;
