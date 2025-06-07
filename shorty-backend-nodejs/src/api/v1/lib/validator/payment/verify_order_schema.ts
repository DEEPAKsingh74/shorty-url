import { z } from 'zod';

export const verifyOrderSchema = z.object({
    razorpay_order_id: z.string().min(3, "razorpay order id not found"),
    razorpay_payment_id: z.string().min(3, "razorpay payment id not found"),
    razorpay_signature: z.string().min(3, "razorpay signature not found"),
    payment_id: z.string().min(3, "payment_id not found"),
});

export type VerifyOrderInput = z.infer<typeof verifyOrderSchema>;