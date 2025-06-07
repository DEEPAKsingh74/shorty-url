"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderService = void 0;
const razorpay_1 = require("../../infrastructure/payment/razorpay");
const createOrderService = async ({ amount, currency, receipt }) => {
    try {
        const order = await razorpay_1.razorpay.orders.create({
            amount: amount * 100,
            currency,
            receipt,
        });
        return order;
    }
    catch (error) {
        throw error;
    }
};
exports.createOrderService = createOrderService;
