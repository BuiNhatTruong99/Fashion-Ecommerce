'use client';

import { useGetCart } from '@/hooks/useCart';
import { useMessage } from '@/hooks/useMessage';
import { QUERIES_KEY } from '@/queries';
import { useAddToCartMutation } from '@/queries/cart';
import { useCartStore } from '@/stores/cart/cart.store';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

interface AddProductProps {
  stockQuantity: number;
  productId: number;
}

const AddProduct: React.FC<AddProductProps> = ({ stockQuantity, productId }) => {
  const [quantity, setQuantity] = useState(0);

  const stock = stockQuantity;

  const handleQuantity = (type: 'i' | 'd') => {
    if (type === 'd' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === 'i' && quantity < stock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useAddToCartMutation();
  const { cart } = useGetCart();
  const message = useMessage();

  const handleAddToCart = () => {
    mutateAsync(
      { productId, quantity, cartId: cart?.id as number },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [QUERIES_KEY.CART.GET_CART] });
          message.success('Product added to cart');
        },
        onError: (err) => {
          message.error(err);
        }
      }
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity('d')}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              onClick={() => handleQuantity('i')}
            >
              +
            </button>
          </div>
          <div className="text-xs">
            Only <span className="text-orange-500">{stock} items</span> left!
            <br /> {"Don't"} miss it
          </div>
        </div>
        <button
          className="w-36 text-sm rounded-3xl ring-1 ring-primary text-primary py-2 px-4 hover:bg-primary hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
          onClick={handleAddToCart}
        >
          {isPending ? 'Adding...' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
};

export default AddProduct;
