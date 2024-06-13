import { ICategory } from '@/domains';
import HttpClient from '../httpClient';

export const getCategories = async (): Promise<ICategory[]> => {
  try {
    const response = await HttpClient.get<ICategory[], any>('/categories');
    return response;
  } catch (error: any) {
    return error?.response;
  }
};
