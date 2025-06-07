import { z } from 'zod';
import { loginSchema } from './login';

export const signupSchema = loginSchema.extend({
  full_name: z.string().min(2, 'Full name is required'),
});

export type SignupSchemaType = z.infer<typeof signupSchema>;