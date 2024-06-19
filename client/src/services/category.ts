import EndPoints from '@/apis/endPoints';
import HttpClient from '@/apis/httpClient';
import { ICategory } from '@/domains';

export const getCategories = async (): Promise<ICategory[]> => {
  try {
    const response = await HttpClient.get<ICategory[], any>(EndPoints.category.getCategories);
    return response;
  } catch (error: any) {
    return error?.response;
  }
};
