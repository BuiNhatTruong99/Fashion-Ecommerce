import { z } from 'zod';

const SignInSchema = z.object({
  email: z.string().email('Email is not valid'),
  password: z.string().min(3, 'Password at least 3 characters').max(50, 'Password at most 50 characters')
});

type TSignInSchema = z.infer<typeof SignInSchema>;

export { SignInSchema };
export type { TSignInSchema };
