import { IAuthResponse, IEmailVerification, ISignIn, ISignUp } from '@/domains/auth.domain';
import { emailVerificationService, signInService, signUpService } from '@/services';
import { useMutation } from '@tanstack/react-query';
import { QUERIES_KEY } from '../key';
import { IApiDataResponse } from '@/domains/data.domain';

export const useSignInMutation = () => {
  return useMutation<IApiDataResponse<IAuthResponse>, string, any>({
    mutationKey: [QUERIES_KEY.AUTH.SIGN_IN],
    mutationFn: (value: ISignIn) => signInService(value)
  });
};

export const useSignUpMutation = () => {
  return useMutation<string, string, any>({
    mutationKey: [QUERIES_KEY.AUTH.SIGN_UP],
    mutationFn: (value: ISignUp) => signUpService(value)
  });
};

export const useEmailVerificationMutation = () => {
  return useMutation<IApiDataResponse<IAuthResponse>, string, any>({
    mutationKey: [QUERIES_KEY.AUTH.EMAIL_VERIFICATION],
    mutationFn: (value: IEmailVerification) => emailVerificationService(value)
  });
};
