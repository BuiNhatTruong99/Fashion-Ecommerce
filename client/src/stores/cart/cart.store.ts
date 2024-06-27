import { ICart } from '@/domains/cart.domain';
import { create } from 'zustand';

interface ICartState {
  cart: ICart;
  counter: number;
  setCart: (cart: ICart) => void;
  addToCart: (productId: string, quantity: number, cartId: number) => void;
  removeFromCart: (productId: string) => void;
}

export const useCartStore = create<ICartState>((set) => ({
  cart: { cartItems: [] },
  counter: 0,
  setCart: (cart) => set({ cart }),
  addToCart: (productId: string, quantity: number, cartId: number) => {},
  removeFromCart: (productId: string) => {}
}));
