import { toPaymentResponse } from "@/api/v1/core/mapper/payment.mapper";
import { prisma } from "@/infrastructure/prisma/prisma";
import { CreatePayment, PaymentResponse } from "@/types/payment";

export const createPaymentService = async (payment: CreatePayment): Promise<PaymentResponse> => {

    try {

        const paymentData = await prisma.payment.create({
            data: payment
        })

        return toPaymentResponse(paymentData);

    } catch (error) {
        throw error;
    }

}