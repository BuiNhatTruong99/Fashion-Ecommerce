import { z } from 'zod';

const ResetPasswordSchema = z.object({
  email: z.string().email('Email is not valid')
});

type TResetPasswordSchema = z.infer<typeof ResetPasswordSchema>;

export { ResetPasswordSchema };
export type { TResetPasswordSchema };
