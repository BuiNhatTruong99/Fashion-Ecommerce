'use client';

import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '@/components/Input';
import { useMessage } from '@/hooks/useMessage';
import { useRouter } from 'next/navigation';
import { ChangePasswordSchema, TChangePasswordSchema } from './validSchema';
import { useChangePasswordMutation } from '@/queries/auth';

const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TChangePasswordSchema>({
    resolver: zodResolver(ChangePasswordSchema),
    mode: 'all'
  });

  const router = useRouter();
  const message = useMessage();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get('token');
    setToken(token);
  }, []);

  const { mutateAsync, isPending } = useChangePasswordMutation();

  const onSubmit = useCallback(
    (value: any) => {
      if (value.password !== value.confirmPassword) {
        message.error('Passwords do not match');
        return;
      }
      mutateAsync(
        { token, password: value.password },
        {
          onSuccess: () => {
            message.success('Password changed successfully');
            router.push('/auth/sign-in');
          },
          onError: (err) => {
            message.error(err);
          }
        }
      );
    },
    [message, mutateAsync, token, router]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <InputForm
          register={register}
          label="New Password"
          type="password"
          name="password"
          errorField={errors.password}
        />
      </div>
      <div className="flex flex-col gap-2">
        <InputForm
          register={register}
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          errorField={errors.confirmPassword}
        />
      </div>
      <button
        className="bg-primary text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
        disabled={isPending}
      >
        {isPending ? 'Loading...' : 'Reset Password'}
      </button>
    </form>
  );
};

export default ChangePasswordForm;
