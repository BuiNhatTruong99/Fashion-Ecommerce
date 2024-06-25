'use client';

import InputForm from '@/components/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { EmailVerificationSchema, TEmailVerificationSchema } from './validSchema';
import { useAuthStore } from '@/stores';
import { useEmailVerificationMutation } from '@/queries/auth';
import { useRouter } from 'next/navigation';
import { useMessage } from '@/hooks/useMessage';

const EmailVerificationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TEmailVerificationSchema>({
    resolver: zodResolver(EmailVerificationSchema),
    mode: 'all'
  });

  const router = useRouter();
  const message = useMessage();

  const { userInfo, setAccessToken, setUserInfo, reset } = useAuthStore();
  const { mutateAsync, isPending } = useEmailVerificationMutation();

  const onSubmit = useCallback(
    (value: any) => {
      const requestBody = {
        ...userInfo,
        otp: value.verificationCode
      };
      mutateAsync(requestBody, {
        onSuccess: (res) => {
          reset();
          setAccessToken(res.data.accessToken);
          setUserInfo(res.data.userInfo);
          router.push('/');
        },

        onError: (err) => {
          message.error(err);
        }
      });
    },
    [mutateAsync, setAccessToken, userInfo, message, reset, setUserInfo, router]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <InputForm
          register={register}
          label="Verification Code"
          type="text"
          name="verificationCode"
          errorField={errors.verificationCode}
        />
      </div>

      <button
        className="bg-primary text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
        disabled={isPending}
      >
        {isPending ? 'Loading...' : 'Submit'}
      </button>
    </form>
  );
};

export default EmailVerificationForm;
