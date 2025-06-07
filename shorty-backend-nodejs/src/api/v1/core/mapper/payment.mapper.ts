import { Payment } from "@prisma/client";
import { PaymentResponse } from "@/types/payment";

export const toPaymentResponse = (payment: Payment): PaymentResponse => {
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
