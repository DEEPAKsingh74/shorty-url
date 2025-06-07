"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOrderSchema = void 0;
const zod_1 = require("zod");
exports.verifyOrderSchema = zod_1.z.object({
    razorpay_order_id: zod_1.z.string().min(3, "razorpay order id not found"),
    razorpay_payment_id: zod_1.z.string().min(3, "razorpay payment id not found"),
    razorpay_signature: zod_1.z.string().min(3, "razorpay signature not found"),
    payment_id: zod_1.z.string().min(3, "payment_id not found"),
});
