import { z } from 'zod';

export const orderSchema = z.object({
  amount: z.number().positive('Amount must be greater than 0'),
  currency: z.string().min(3, 'Currency is required'),
});

export type OrderInput = z.infer<typeof orderSchema>;