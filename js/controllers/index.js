"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.technologyController = exports.feedbackController = exports.userController = void 0;
const feedbackController_1 = __importDefault(require("./feedbackController"));
const userController_1 = __importDefault(require("./userController"));
const technologyController_1 = __importDefault(require("./technologyController"));
const userController = new userController_1.default();
exports.userController = userController;
const technologyController = new technologyController_1.default();
exports.technologyController = technologyController;
const feedbackController = new feedbackController_1.default();
exports.feedbackController = feedbackController;
