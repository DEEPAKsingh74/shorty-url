"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.softAuthMiddleware = void 0;
const env_config_1 = require("../config/env_config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN_SECRET = env_config_1.envConfig.access_secret;
const softAuthMiddleware = (req, _res, next) => {
    try {
        // Get token from headers, cookies, or query params
        let token;
        // 1. From Authorization header
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            token = authHeader.split(" ")[1];
        }
        // 2. From cookies
        if (!token && req.cookies?.access_token) {
            token = req.cookies.access_token;
        }
        // 3. From query param
        if (!token && typeof req.query.access_token === "string") {
            token = req.query.access_token;
        }
        // Verify token
        if (token) {
            const decoded = jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET);
            req.user = decoded;
        }
        next();
    }
    catch (error) {
        next(error);
        return;
    }
};
exports.softAuthMiddleware = softAuthMiddleware;
