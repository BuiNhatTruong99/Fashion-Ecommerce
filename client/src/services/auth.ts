import EndPoints from '@/apis/endPoints';
import HttpClient from '@/apis/httpClient';
import {
  IEmailVerification,
  ISignIn,
  ISignUp,
  IApiDataResponse,
  ISignInResponse,
  IChangePassword
} from '@/domains';

export const signInService = async (value: ISignIn) => {
  return await HttpClient.post<ISignIn, IApiDataResponse<ISignInResponse>>(EndPoints.auth.signIn, {
    email: value.email,
    password: value.password
  });
};

export const signUpService = async (value: ISignUp) =>
  await HttpClient.post<ISignUp, any>(EndPoints.auth.signUp, {
    email: value.email
  });

export const emailVerificationService = async (value: IEmailVerification) => {
  return await HttpClient.post<IEmailVerification, IApiDataResponse<ISignInResponse>>(
    EndPoints.auth.emailVerification,
    {
      email: value.email,
      fullName: value.fullName,
      password: value.password,
      otp: value.otp
    }
  );
};

export const forgotPasswordService = async (value: ISignUp) =>
  await HttpClient.post<ISignUp, any>(EndPoints.auth.forgotPassword, {
    email: value.email
  });

export const changePasswordService = async (value: IChangePassword) =>
  await HttpClient.put<IChangePassword, any>(EndPoints.auth.changePassword, {
    newPassword: value.password,
    token: value.token
  });
