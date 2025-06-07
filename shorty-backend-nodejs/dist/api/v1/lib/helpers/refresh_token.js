"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRefreshToken = exports.generateRefreshToken = void 0;
const env_config_1 = require("../../../../config/env_config");
const ErrorStatus_1 = require("../../../../utils/error_handler/ErrorStatus");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateRefreshToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, env_config_1.envConfig.refresh_secret, {
        expiresIn: "30d",
    });
};
exports.generateRefreshToken = generateRefreshToken;
const verifyRefreshToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_config_1.envConfig.refresh_secret);
        return decoded;
    }
    catch (err) {
        throw new ErrorStatus_1.UnauthorizedError("Invalid or expired refresh token");
    }
};
exports.verifyRefreshToken = verifyRefreshToken;
