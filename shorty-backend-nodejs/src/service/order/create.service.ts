import { razorpay } from "@/infrastructure/payment/razorpay";
import { Orders } from "razorpay/dist/types/orders";

interface CreateOrderServiceProps {
    amount: number,
    currency: string;
    receipt?: string
}

export const createOrderService = async ({ amount, currency, receipt }: CreateOrderServiceProps): Promise<Orders.RazorpayOrder> => {
    try {

        const order = await razorpay.orders.create({
            amount: amount,
            currency,
            receipt,
        });

        return order;


    } catch (error) {
        throw error;
    }
}