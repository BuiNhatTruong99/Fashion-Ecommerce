import EndPoints from '@/apis/endPoints';
import HttpClient from '@/apis/httpClient';
import { IAddToCart, ICart } from '@/domains/cart.domain';

export const getCartService = async (userId: number): Promise<any> =>
  await HttpClient.get<ICart, any>(EndPoints.cart.getCart, { params: { userId } });

export const addItemToCartService = async (value: IAddToCart) =>
  await HttpClient.post<IAddToCart, any>(EndPoints.cart.addToCart, value);
