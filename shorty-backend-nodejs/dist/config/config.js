"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvValue = getEnvValue;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const ErrorStatus_1 = require("../utils/error_handler/ErrorStatus");
const Logger_1 = __importDefault(require("../infrastructure/logger/Logger"));
dotenv_1.default.config({ path: path_1.default.join(__dirname, '../../local.env') });
function getEnvValue(key, defaultValue) {
    const value = process.env[key] || defaultValue;
    if (!value) {
        Logger_1.default.error(`Missing environment variable ${key}`);
        throw new ErrorStatus_1.InternalServerError(`Missing environment variable ${key}`);
    }
    return value;
}
