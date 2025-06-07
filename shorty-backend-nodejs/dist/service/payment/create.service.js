"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaymentService = void 0;
const payment_mapper_1 = require("../../api/v1/core/mapper/payment.mapper");
const prisma_1 = require("../../infrastructure/prisma/prisma");
const createPaymentService = async (payment) => {
    try {
        const paymentData = await prisma_1.prisma.payment.create({
            data: payment
        });
        return (0, payment_mapper_1.toPaymentResponse)(paymentData);
    }
    catch (error) {
        throw error;
    }
};
exports.createPaymentService = createPaymentService;
