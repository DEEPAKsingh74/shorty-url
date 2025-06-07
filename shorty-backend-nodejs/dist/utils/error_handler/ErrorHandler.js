"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const Logger_1 = __importDefault(require("../../infrastructure/logger/Logger"));
const ErrorBase_1 = require("./ErrorBase");
const errorHandler = (err, req, res, _next) => {
    Logger_1.default.error(`${req.method} ${req.originalUrl} - ${err}`);
    console.log("Error handler: ", err);
    if (err instanceof ErrorBase_1.ErrorBase) {
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
};
exports.errorHandler = errorHandler;
