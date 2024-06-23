'use client';

import InputForm from '@/components/Input';
import Link from 'next/link';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignInSchema, TSignInSchema } from './validSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignInMutation } from '@/queries/auth';
import { ISignIn } from '@/domains/auth.domain';

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TSignInSchema>({
    resolver: zodResolver(SignInSchema),
    mode: 'all'
  });

  const { mutate, isPending } = useSignInMutation();

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = useCallback(
    (value: ISignIn) => {
      mutate(value, {
        onSuccess: (res) => {
          alert(JSON.stringify(res.accessToken));
        }
      });
    },
    [mutate]
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <InputForm register={register} label="Email" type="email" name="email" errorField={errors.email} />
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
        {error && <div className="text-red-600">{error}</div>}
      </form>
      {message && <div className="text-green-600 text-sm">{message}</div>}
    </div>
  );
};

export default SignInForm;
