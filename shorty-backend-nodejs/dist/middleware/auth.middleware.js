"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const env_config_1 = require("../config/env_config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ACCESS_TOKEN_SECRET = env_config_1.envConfig.access_secret;
const authMiddleware = (req, res, next) => {
    try {
        // Get token from headers, cookies, or query params
        let token;
        console.log("inside auth middleware");
        // 1. From Authorization header
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            console.log("headers");
            token = authHeader.split(" ")[1];
        }
        // 2. From cookies
        console.log("cookies req: ", req.cookies);
        if (!token && req.cookies?.access_token) {
            console.log("cookies");
            token = req.cookies.access_token;
        }
        // 3. From query param
        if (!token && typeof req.query.access_token === "string") {
            console.log("params");
            token = req.query.access_token;
        }
        if (!token) {
            res.status(401).json({ message: "Access token not found" });
            return;
        }
        console.log("Token auth: ", token);
        // Verify token
        const decoded = jsonwebtoken_1.default.verify(token, ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        next(error);
        return;
    }
};
exports.authMiddleware = authMiddleware;
