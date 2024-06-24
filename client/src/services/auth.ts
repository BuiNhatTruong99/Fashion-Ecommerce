import EndPoints from "@/apis/endPoints";
import HttpClient from "@/apis/httpClient";
import {
  IAuthResponse,
  IEmailVerification,
  ISignIn,
  ISignUp,
  IApiDataResponse,
} from "@/domains";

export const signInService = async (value: ISignIn) => {
  try {
    const response = await HttpClient.post<
      ISignIn,
      IApiDataResponse<IAuthResponse>
    >(EndPoints.auth.signIn, {
      email: value.email,
      password: value.password,
    });
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};

export const signUpService = async (value: ISignUp) =>
  await HttpClient.post<ISignUp, IApiDataResponse<IAuthResponse>>(
    EndPoints.auth.signUp,
    {
      email: value.email,
    }
  );

export const emailVerificationService = async (value: IEmailVerification) => {
  try {
    const response = await HttpClient.post<
      IEmailVerification,
      IApiDataResponse<IAuthResponse>
    >(EndPoints.auth.emailVerification, {
      email: value.email,
      fullName: value.fullName,
      password: value.password,
      otp: value.otp,
    });
    return response?.data;
  } catch (error: any) {
    return error?.response?.data;
  }
};
