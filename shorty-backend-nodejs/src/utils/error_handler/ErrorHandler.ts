import { NextFunction, Request, Response } from "express";
import logger from "@infra/logger/Logger";
import { ErrorBase } from "./ErrorBase";

export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    logger.error(`${req.method} ${req.originalUrl} - ${err}`);

    console.log("Error handler: ", err);
    

    if (err instanceof ErrorBase) {
        res.status(err.code).json({
            success: false,
            error: {
                message: err.message,
                detail: err.details || null,
                status: err.code,
                fix: err.fix
            }
        });
        return;
    }
    res.status(500).json({
        success: false,
        error: {
            message: "Internal Server Error",
            detail: "Something went wrong! Please retry",
            status: 500,
            fix: "Please refresh page"
        }
    });
    return;
}