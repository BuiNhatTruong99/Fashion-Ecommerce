import EndPoints from '@/apis/endPoints';
import HttpClient from '@/apis/httpClient';
import { IAuthResponse, ISignIn } from '@/domains/auth.domain';

export const loginService = async (value: ISignIn) => {
  try {
    const response = await HttpClient.post<ISignIn, IAuthResponse>(EndPoints.auth.login, {
      email: value.email,
      password: value.password
    });
    return response;
  } catch (error: any) {
    return error?.response;
  }
};
