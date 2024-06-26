import {
  IEmailVerification,
  ISignIn,
  ISignUp,
  IApiDataResponse,
  ISignInResponse,
  IChangePassword
} from '@/domains';
import {
  changePasswordService,
  emailVerificationService,
  forgotPasswordService,
  signInService,
  signUpService
} from '@/services';
import { useMutation } from '@tanstack/react-query';
import { QUERIES_KEY } from '../key';

export const useSignInMutation = () => {
  return useMutation<IApiDataResponse<ISignInResponse>, string, any>({
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
  return useMutation<IApiDataResponse<ISignInResponse>, string, any>({
    mutationKey: [QUERIES_KEY.AUTH.EMAIL_VERIFICATION],
    mutationFn: (value: IEmailVerification) => emailVerificationService(value)
  });
};

export const useForgotPaswordMutation = () => {
  return useMutation<string, string, any>({
    mutationKey: [QUERIES_KEY.AUTH.FORGOT_PASSWORD],
    mutationFn: (value: ISignUp) => forgotPasswordService(value)
  });
};

export const useChangePasswordMutation = () => {
  return useMutation<string, string, any>({
    mutationKey: [QUERIES_KEY.AUTH.CHANGE_PASSWORD],
    mutationFn: (value: IChangePassword) => changePasswordService(value)
  });
};
