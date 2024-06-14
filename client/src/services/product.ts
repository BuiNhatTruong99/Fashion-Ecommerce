import EndPoints from '@/apis/endPoints';
import HttpClient from '@/apis/httpClient';
import { IProduct } from '@/domains';
import { IProductListProps } from '@/domains/params.domain';

export const getProducts = async ({ categoryId, limit }: IProductListProps): Promise<IProduct[]> => {
  try {
    const response = await HttpClient.get<IProduct[], any>(EndPoints.product.getProducts, {
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

export const getProductDetail = async (productId: number): Promise<IProduct> => {
  try {
    const response = await HttpClient.get<IProduct, any>(EndPoints.product.getProductDetail(productId));
    return response;
  } catch (error: any) {
    return error?.response;
  }
};
