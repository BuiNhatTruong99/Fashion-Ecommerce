'use client';

import InputForm from '@/components/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { EmailVerificationSchema, TEmailVerificationSchema } from './validSchema';
import { useAuthStore } from '@/stores';

const EmailVerificationForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TEmailVerificationSchema>({
    resolver: zodResolver(EmailVerificationSchema),
    mode: 'all'
  });

  const { userInfo, reset } = useAuthStore();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  console.log(userInfo);

  const onSubmit = useCallback(
    (value: any) => {
      reset();
    },
    [reset]
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

      {/* <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-700">Verification Code</label>
          <input
            type="text"
            name="emailCode"
            placeholder="Code"
            className="ring-2 ring-gray-300 rounded-md p-4"
            onChange={(e) => setEmailCode(e.target.value)}
          />
        </div> */}

      <button
        className="bg-primary text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Submit'}
      </button>
      {error && <div className="text-red-600">{error}</div>}

      {message && <div className="text-green-600 text-sm">{message}</div>}
    </form>
  );
};

export default EmailVerificationForm;
