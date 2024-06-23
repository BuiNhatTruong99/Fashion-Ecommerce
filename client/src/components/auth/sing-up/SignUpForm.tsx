'use client';

import InputForm from '@/components/Input';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignUpSchema, TSignUpSchema } from './validSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores';

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

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = useCallback(
    (value: any) => {
      setUserInfo(value);
      router.push('/auth/email-verification');
    },
    [router, setUserInfo]
  );

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <InputForm register={register} label="Full Name" type="text" name="fullName" errorField={errors.fullName} />
        </div>
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
        <button
          className="bg-primary text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
          //   disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Sign Up'}
        </button>
        {error && <div className="text-red-600">{error}</div>}
      </form>
      {message && <div className="text-green-600 text-sm">{message}</div>}
    </div>
  );
};

export default SignUpForm;
