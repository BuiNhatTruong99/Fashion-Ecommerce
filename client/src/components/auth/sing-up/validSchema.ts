import { z } from 'zod';

const SignUpSchema = z.object({
  fullName: z.string().min(3, 'Last name at least 3 characters'),
  email: z.string().email('Email is not valid'),
  password: z.string().min(6, 'Password at least 6 characters')
});

type TSignUpSchema = z.infer<typeof SignUpSchema>;

export { SignUpSchema };
export type { TSignUpSchema };
