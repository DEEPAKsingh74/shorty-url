"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPaymentResponse = void 0;
const toPaymentResponse = (payment) => {
    return {
        id: payment.id,
        userId: payment.userId,
        currency: payment.currency,
        status: payment.status,
        amount: payment.amount.toNumber(),
        transaction_id: payment.transactionId || undefined,
        created_at: payment.createdAt ?? ""
    };
};
exports.toPaymentResponse = toPaymentResponse;
