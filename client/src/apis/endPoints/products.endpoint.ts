import { IProduct } from '@/domains';
import HttpClient from '../httpClient';
import { IProductListProps } from '@/domains/params.domain';

export const getProducts = async (categoryId: string, limit: number): Promise<IProduct[]> => {
  try {
    const response = await HttpClient.get<IProduct[], any>('/products', {
      params: {
        category_id: categoryId,
        limit
      }
    });
    return response;
  } catch (error: any) {
    return error?.response;
  }
};
