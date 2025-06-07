"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.razorpay = void 0;
const env_config_1 = require("../../config/env_config");
const razorpay_1 = __importDefault(require("razorpay"));
const RAZORPAY_KEY_ID = env_config_1.envConfig.razorpay_key_id;
const RAZORPAY_KEY_SECRET = env_config_1.envConfig.razorpay_key_secret;
exports.razorpay = new razorpay_1.default({
    key_id: RAZORPAY_KEY_ID,
    key_secret: RAZORPAY_KEY_SECRET,
});
