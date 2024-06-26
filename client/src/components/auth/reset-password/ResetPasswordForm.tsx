'use client';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { TResetPasswordSchema, ResetPasswordSchema } from './validSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '@/components/Input';
import { useMessage } from '@/hooks/useMessage';
import { useForgotPaswordMutation } from '@/queries/auth';
import { useRouter } from 'next/navigation';

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: 'all'
  });

  const message = useMessage();

  const { mutateAsync, isPending } = useForgotPaswordMutation();

  const onSubmit = useCallback(
    (value: any) => {
      mutateAsync(value, {
        onSuccess: () => {
          message.success('Check your email to reset your password');
        },
        onError: (err) => {
          message.error(err);
        }
      });
    },
    [message, mutateAsync]
  );

  return (
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

      <button
        className="bg-primary text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
        disabled={isPending}
      >
        {isPending ? 'Loading...' : 'Reset Password'}
      </button>
    </form>
  );
};

export default ResetPasswordForm;
