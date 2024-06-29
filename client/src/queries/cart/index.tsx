import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERIES_KEY } from '../key';
import { IAddToCart } from '@/domains/cart.domain';
import { addItemToCartService, deleteCartItemService, getCartService } from '@/services/cart';

export const useCart = (value: number) => {
  return useQuery({
    queryKey: [QUERIES_KEY.CART.GET_CART],
    queryFn: () => getCartService(value)
  });
};

export const useAddToCartMutation = () => {
  return useMutation<string, string, any>({
    mutationKey: [QUERIES_KEY.CART.ADD_TO_CART],
    mutationFn: (value: IAddToCart) => addItemToCartService(value)
  });
};

export const useDeleteCartItemMutation = () => {
  return useMutation<string, string, any>({
    mutationKey: [QUERIES_KEY.CART.REMOVE_FROM_CART],
    mutationFn: (value: number) => deleteCartItemService(value)
  });
};
