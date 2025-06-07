"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccessToken = exports.generateAccessToken = void 0;
const env_config_1 = require("../../../../config/env_config");
const ErrorStatus_1 = require("../../../../utils/error_handler/ErrorStatus");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, env_config_1.envConfig.access_secret, {
        expiresIn: "1d",
    });
};
exports.generateAccessToken = generateAccessToken;
const verifyAccessToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_config_1.envConfig.access_secret);
        return decoded;
    }
    catch (err) {
        if (err instanceof jsonwebtoken_1.default.TokenExpiredError) {
            throw new ErrorStatus_1.UnauthorizedError("Token expired");
        }
        throw err;
    }
};
exports.verifyAccessToken = verifyAccessToken;
