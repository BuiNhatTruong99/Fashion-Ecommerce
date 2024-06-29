import { ICartItem } from '@/domains/cart.domain';
import { useCart } from '@/queries/cart';
import { useAuthStore } from '@/stores';
import { useCartStore } from '@/stores/cart/cart.store';
import { useEffect } from 'react';

export const useGetCart = () => {
  const { userInfo } = useAuthStore();
  const { counter, cart, setCart, setCounter, setTotal, total } = useCartStore();

  const { data: carrList, isLoading } = useCart(userInfo?.userId as number);

  useEffect(() => {
    if (carrList) {
      const totalQuantity = carrList.cartItems.reduce(
        (acc: number, item: ICartItem) => acc + item.quantity,
        0
      );
      const totalPrice = carrList.cartItems.reduce(
        (acc: number, item: ICartItem) => acc + item.quantity * item.product.newPrice,
        0
      );
      setCart(carrList);
      setCounter(totalQuantity);
      setTotal(totalPrice);
    }
  }, [carrList, setCart, setCounter, setTotal]);

  return { cart, counter, isLoading, total };
};
