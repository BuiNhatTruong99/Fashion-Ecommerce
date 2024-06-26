'use client';

import InputForm from '@/components/Input';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignUpSchema, TSignUpSchema } from './validSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores';
import { useSignUpMutation } from '@/queries/auth';
import { useMessage } from '@/hooks/useMessage';

const SignUpForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
    mode: 'all'
  });

  const router = useRouter();

  const { setUserInfo } = useAuthStore();
  const { mutateAsync, isPending } = useSignUpMutation();
  const message = useMessage();

  const onSubmit = useCallback(
    (value: any) => {
      const userData = {
        fullName: value.fullName,
        email: value.email,
        password: value.password
      };
      mutateAsync(value, {
        onSuccess: () => {
          setUserInfo(userData);
          router.push('/auth/email-verification');
        },
        onError: (err) => {
          message.error(err);
        }
      });
    },
    [router, setUserInfo, mutateAsync, message]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <InputForm
          register={register}
          label="Full Name"
          type="text"
          name="fullName"
          errorField={errors.fullName}
        />
      </div>
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
      <button
        className="bg-primary text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
        disabled={isPending}
      >
        {isPending ? 'Loading...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default SignUpForm;
