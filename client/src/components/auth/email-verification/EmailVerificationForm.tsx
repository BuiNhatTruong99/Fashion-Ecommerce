'use client';

import InputForm from '@/components/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { EmailVerificationSchema, TEmailVerificationSchema } from './validSchema';
import { useAuthStore } from '@/stores';
import { useEmailVerificationMutation } from '@/queries/auth';
import { useRouter } from 'next/navigation';
import { STATUS_CODES } from 'http';
import { IEmailVerification } from '@/domains/auth.domain';
import { HttpStatusCode } from 'axios';

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

  const { userInfo, setAccessToken } = useAuthStore();
  const { mutateAsync, isPending } = useEmailVerificationMutation();
  const [message, setMessage] = useState<string | undefined>('');

  console.log(userInfo);

  const onSubmit = useCallback(
    (value: any) => {
      const requestBody = {
        ...userInfo,
        otp: value.verificationCode
      };

      mutateAsync(requestBody, {
        onSuccess: (res) => {
          console.log(res);

          if (res.status === HttpStatusCode.Ok) {
            setAccessToken(res.data.accessToken);
            router.push('/auth/sign-in');
          }

          setMessage(res?.message);
        }
      });
    },
    [mutateAsync, setAccessToken, router, userInfo]
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

      {message && <div className="text-primary text-md font-bold">{message}</div>}
    </form>
  );
};

export default EmailVerificationForm;
