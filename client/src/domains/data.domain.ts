import { AxiosError, AxiosResponse } from 'axios';

export interface IErrorData {
  status?: number;
  message?: string;
  time?: string;
}

export interface IApiDataResponse<T> {
  data: T;
  status?: number;
  time?: string;
  message?: string;
}
export type IApiResponse<T> = AxiosResponse<IApiDataResponse<T>>;
export type IApiResponseError<T> = AxiosError<IApiDataResponse<T>>;
