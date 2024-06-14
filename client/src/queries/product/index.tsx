import { getProductDetail, getProducts } from '@/services';
import { useQuery } from '@tanstack/react-query';
import { QUERIES_KEY } from '../key';
import { IProductListProps } from '@/domains/params.domain';

export const useProductList = ({ categoryId, limit }: IProductListProps) => {
  return useQuery({
    queryFn: () => getProducts({ categoryId, limit }),
    queryKey: [QUERIES_KEY.PRODUCT.GET_PRODUCTS, categoryId, limit]
  });
};

export const useProductDetail = (id: number) => {
  return useQuery({
    queryFn: () => getProductDetail(id),
    queryKey: [QUERIES_KEY.PRODUCT.GET_PRODUCT_DETAIL, id]
  });
};
