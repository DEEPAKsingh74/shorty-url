"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderSchema = void 0;
const zod_1 = require("zod");
exports.orderSchema = zod_1.z.object({
    amount: zod_1.z.number().positive('Amount must be greater than 0'),
    currency: zod_1.z.string().min(3, 'Currency is required'),
});
