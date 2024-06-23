'use client';

import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { TResetPasswordSchema, ResetPasswordSchema } from './validSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import InputForm from '@/components/Input';

const ResetPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
    mode: 'all'
  });

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const onSubmit = useCallback((value: any) => {
    alert(JSON.stringify(value));
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <InputForm register={register} label="Email" type="email" name="email" errorField={errors.email} />
      </div>

      <button
        className="bg-primary text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed"
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Reset Password'}
      </button>
      {error && <div className="text-red-600">{error}</div>}

      {message && <div className="text-green-600 text-sm">{message}</div>}
    </form>
  );
};

export default ResetPasswordForm;
