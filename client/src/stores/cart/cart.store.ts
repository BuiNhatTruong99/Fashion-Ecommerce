import { number } from 'zod';
import { ICart } from '@/domains/cart.domain';
import { create } from 'zustand';

interface ICartState {
  cart: ICart;
  counter: number;
  total: number;
  setCart: (cart: ICart) => void;
  setCounter: (counter: number) => void;
  setTotal: (total: number) => void;
}

export const useCartStore = create<ICartState>((set) => ({
  cart: { id: 0, cartItems: [] },
  counter: 0,
  total: 0,
  setCart: (cart) => set({ cart }),
  setCounter: (counter) => set({ counter }),
  setTotal: (total) => set({ total })
}));
