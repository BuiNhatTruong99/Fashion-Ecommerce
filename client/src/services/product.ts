import EndPoints from '@/apis/endPoints';
import HttpClient from '@/apis/httpClient';
import { IProduct, IProductVariant } from '@/domains';
import { IProductListProps, IProductVariantsProps } from '@/domains/params.domain';

export const getProducts = async ({ categoryId, limit, searchParams }: IProductListProps): Promise<IProduct[]> => {
  try {
    const params: any = {
      category_id: categoryId == 1 ? null : categoryId,
      limit
    };

    if (searchParams?.sort) {
      const [sortBy, sortDirection] = searchParams.sort.split('_');
      params.sortBy = sortBy;
      params.sortDirection = sortDirection;
    }

    const response = await HttpClient.get<IProduct[], any>(EndPoints.product.getProducts, { params });
    return response;
  } catch (error: any) {
    throw new Error(error?.response || 'Failed to fetch products');
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

export const getProductVariants = async ({
  productId,
  color,
  size
}: IProductVariantsProps): Promise<IProductVariant[]> => {
  try {
    const response = await HttpClient.get<IProductVariant, any>(EndPoints.product.getProductVariants, {
      params: {
        product_id: productId,
        color,
        size
      }
    });
    return response;
  } catch (error: any) {
    return error?.response;
  }
};
