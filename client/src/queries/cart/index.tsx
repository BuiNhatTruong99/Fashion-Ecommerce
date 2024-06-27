import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERIES_KEY } from '../key';
import { IAddToCart } from '@/domains/cart.domain';
import { addItemToCartService, getCartService } from '@/services/cart';

export const useCart = (value: number) => {
  return useQuery({
    queryKey: [QUERIES_KEY.CART.GET_CART, value],
    queryFn: () => getCartService(value),
    enabled: !!value
  });
};

export const useAddToCartMutation = () => {
  return useMutation<string, string, any>({
    mutationKey: [QUERIES_KEY.CART.ADD_TO_CART],
    mutationFn: (value: IAddToCart) => addItemToCartService(value)
  });
};
