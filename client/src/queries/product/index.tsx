import { getProductDetail, getProductVariants, getProducts } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { QUERIES_KEY } from "../key";
import { IProductListProps, IProductVariantsProps } from "@/domains";

export const useProductList = ({
  categoryId,
  limit,
  searchParams,
}: IProductListProps) => {
  return useQuery({
    queryFn: () => getProducts({ categoryId, limit, searchParams }),
    queryKey: [
      QUERIES_KEY.PRODUCT.GET_PRODUCTS,
      categoryId,
      limit,
      searchParams,
    ],
  });
};

export const useProductDetail = (id: number) => {
  return useQuery({
    queryFn: () => getProductDetail(id),
    queryKey: [QUERIES_KEY.PRODUCT.GET_PRODUCT_DETAIL, id],
  });
};

export const useProductVariants = ({
  productId,
  color,
  size,
}: IProductVariantsProps) => {
  return useQuery({
    queryFn: () => getProductVariants({ productId, color, size }),
    queryKey: [
      QUERIES_KEY.PRODUCT.GET_PRODUCT_VARIANTS,
      productId,
      color,
      size,
    ],
  });
};
