import { toPaymentResponse } from "@/api/v1/core/mapper/payment.mapper";
import { PaymentStatus } from "@prisma/client";
import { prisma } from "@/infrastructure/prisma/prisma";
import { PaymentResponse } from "@/types/payment";

export const updatePaymentService = async (
    status: PaymentStatus,
    id: string
): Promise<PaymentResponse> => {
    try {
        // Update the payment with the new status
        const paymentData = await prisma.payment.update({
            where: { id },
            data: {
                status,
            },
        });

        return toPaymentResponse(paymentData);
    } catch (error) {
        console.error("Error updating payment:", error);
        throw error;
    }
};
