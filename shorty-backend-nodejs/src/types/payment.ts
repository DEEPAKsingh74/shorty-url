import { PaymentStatus } from "@prisma/client";

export type CreatePayment = {
    userId: string;
    amount: number;
    currency: string;
    status: PaymentStatus  
}

export type PaymentResponse = {
    id: string;
    userId: string;
    amount: number;
    currency: string;
    status: PaymentStatus
    transaction_id?: string;
    created_at?: Date;
}