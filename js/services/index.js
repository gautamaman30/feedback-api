"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbackService = exports.technologyService = exports.userService = void 0;
const userService_1 = __importDefault(require("./userService"));
const technologyService_1 = __importDefault(require("./technologyService"));
const feedbackService_1 = __importDefault(require("./feedbackService"));
const userService = new userService_1.default();
exports.userService = userService;
const technologyService = new technologyService_1.default();
exports.technologyService = technologyService;
const feedbackService = new feedbackService_1.default();
exports.feedbackService = feedbackService;
