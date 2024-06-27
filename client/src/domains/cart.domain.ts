import { IProduct } from './product.domain';

interface ICart {
  cartItems: ICartItem[];
}

interface ICartItem {
  id: number;
  product: IProduct;
  quantity: number;
}

interface IAddToCart {
  productId: number;
  quantity: number;
  cartId: number;
}

export type { ICart, ICartItem, IAddToCart };
