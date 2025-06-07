import { useState } from 'react';
import { ZodSchema } from 'zod';

export function useValidation<T>(schema: ZodSchema<T>) {
  const [errors, setErrors] = useState<Partial<Record<keyof T, string[]>>>({});

  const validate = (data: unknown): { valid: true; data: T } | { valid: false } => {
    const result = schema.safeParse(data);
    if (result.success) {
      setErrors({});
      return { valid: true, data: result.data };
    } else {
      const fieldErrors = result.error.flatten().fieldErrors as Partial<Record<keyof T, string[]>>;
      setErrors(fieldErrors);
      return { valid: false };
    }
  };

  return { validate, errors };
}
