import { z } from 'zod';

const EmailVerificationSchema = z.object({
  verificationCode: z
    .string()
    .length(6, 'Code must be 6-digit number')
    .regex(/^\d{6}$/, 'Code must be 6-digit number')
});

type TEmailVerificationSchema = z.infer<typeof EmailVerificationSchema>;

export { EmailVerificationSchema };
export type { TEmailVerificationSchema };
