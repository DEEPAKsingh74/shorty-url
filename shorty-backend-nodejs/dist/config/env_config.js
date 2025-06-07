"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envConfig = void 0;
const config_1 = require("./config");
exports.envConfig = {
    port: parseInt((0, config_1.getEnvValue)('PORT', '8000'), 10),
    env: (0, config_1.getEnvValue)('NODE_ENV', "development"),
    access_secret: (0, config_1.getEnvValue)('ACCESS_SECRET'),
    refresh_secret: (0, config_1.getEnvValue)('REFRESH_SECRET'),
    razorpay_key_id: (0, config_1.getEnvValue)('RAZORPAY_KEY_ID'),
    razorpay_key_secret: (0, config_1.getEnvValue)('RAZORPAY_KEY_SECRET')
};
