"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshMiddleware = void 0;
const env_config_1 = require("../config/env_config");
const ErrorStatus_1 = require("../utils/error_handler/ErrorStatus");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const REFRESH_TOKEN_SECRET = env_config_1.envConfig.refresh_secret;
const refreshMiddleware = (req, _res, next) => {
    try {
        console.log("refresh middleware");
        // Get token from headers, cookies, or query params
        let token;
        // 1. From Authorization header
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer rt ")) {
            console.log("auth header: ", authHeader);
            token = authHeader.split(" ")[2];
        }
        // 2. From cookies
        if (!token && req.cookies?.refresh_token) {
            console.log("auth header: ", req.cookies.refresh_token);
            token = req.cookies.refresh_token;
        }
        // 3. From query param
        if (!token && typeof req.query.refresh_token === "string") {
            token = req.query.refresh_token;
        }
        console.log(" refresh token: ", token);
        if (!token) {
            throw new ErrorStatus_1.UnauthorizedError("token not found");
        }
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, REFRESH_TOKEN_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log("error refresh: ", error);
        next(error);
        return;
    }
};
exports.refreshMiddleware = refreshMiddleware;
