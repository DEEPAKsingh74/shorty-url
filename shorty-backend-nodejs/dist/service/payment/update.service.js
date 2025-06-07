"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePaymentService = void 0;
const payment_mapper_1 = require("../../api/v1/core/mapper/payment.mapper");
const prisma_1 = require("../../infrastructure/prisma/prisma");
const updatePaymentService = async (status, id) => {
    try {
        // Update the payment with the new status
        const paymentData = await prisma_1.prisma.payment.update({
            where: { id },
            data: {
                status,
            },
        });
        return (0, payment_mapper_1.toPaymentResponse)(paymentData);
    }
    catch (error) {
        console.error("Error updating payment:", error);
        throw error;
    }
};
exports.updatePaymentService = updatePaymentService;
