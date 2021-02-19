import { Application } from "express";
export declare class RoutesHandler {
    app: Application;
    constructor(app: Application);
    configureRoutes(): Application;
}
