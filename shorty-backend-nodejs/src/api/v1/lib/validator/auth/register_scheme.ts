import { z } from 'zod';
import { loginSchema } from './login_schema';

export const registerSchema = loginSchema.extend({
    full_name: z.string().min(3, 'Full name must be at least 3 characters long').optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;