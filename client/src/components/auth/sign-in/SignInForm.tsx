'use client';

import InputForm from '@/components/Input';
import Link from 'next/link';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { SignInSchema, TSignInSchema } from './validSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignInMutation } from '@/queries/auth';
import { ISignIn } from '@/domains/auth.domain';
import { useAuthStore } from '@/stores';
import { useMessage } from '@/hooks/useMessage';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/stores/cart/cart.store';
import { useCart } from '@/queries/cart';
import { useGetCart } from '@/hooks/useCart';

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TSignInSchema>({
    resolver: zodResolver(SignInSchema),
    mode: 'all'
  });

  const router = useRouter();
  const { setUserInfo, setAccessToken, reset } = useAuthStore();

  const { mutateAsync, isPending } = useSignInMutation();
  const message = useMessage();

  const onSubmit = useCallback(
    (value: ISignIn) => {
      mutateAsync(value, {
        onSuccess: (res) => {
          reset();
          setUserInfo(res.data.userInfo);
          setAccessToken(res.data.accessToken);
          router.push('/');
        },
        onError: () => {
          message.error('Email or password is incorrect');
        }
      });
    },
    [mutateAsync, message, setAccessToken, setUserInfo, reset, router]
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <InputForm
            register={register}
            label="Email"
            type="email"
            name="email"
            errorField={errors.email}
          />
        </div>
        <div className="flex flex-col gap-2">
          <InputForm
            register={register}
            label="Password"
            type="password"
            name="password"
            errorField={errors.password}
          />
        </div>
        <Link href="/auth/reset-password" className="text-sm underline cursor-pointer">
          Forgot Password?
        </Link>
        <button
          className="bg-primary text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {isPending ? 'Loading...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
