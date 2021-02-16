import express from "express";
export declare class AppRoutes {
    app: express.Application;
    constructor(app: express.Application);
    configureRoutes(): express.Application;
}
