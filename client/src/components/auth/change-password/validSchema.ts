import { z } from 'zod';

const ChangePasswordSchema = z.object({
  password: z
    .string()
    .min(3, 'Password at least 3 characters')
    .max(50, 'Password at most 50 characters'),
  confirmPassword: z
    .string()
    .min(3, 'Password at least 3 characters')
    .max(50, 'Password at most 50 characters')
});

type TChangePasswordSchema = z.infer<typeof ChangePasswordSchema>;

export { ChangePasswordSchema };
export type { TChangePasswordSchema };
