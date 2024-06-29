import { useGetCart } from '@/hooks/useCart';
import Image from 'next/image';
import Skeleton from './Skeleton';
import { useDeleteCartItemMutation } from '@/queries/cart';
import { useMessage } from '@/hooks/useMessage';
import { useQueryClient } from '@tanstack/react-query';
import { QUERIES_KEY } from '@/queries';
import { useAuthStore } from '@/stores';
import { useState } from 'react';

const CartModel = () => {
  const { userInfo } = useAuthStore();
  const { cart, isLoading, counter, total } = useGetCart();
  const { mutateAsync } = useDeleteCartItemMutation();
  const message = useMessage();
  const queryClient = useQueryClient();

  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  const handleRemoveItem = (id: number) => {
    mutateAsync(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [QUERIES_KEY.CART.GET_CART]
        });
        message.success('Item removed successfully');
      },
      onError: (err) => message.error(err)
    });
  };
  return (
    <>
      <div className="">
        <Image
          src="/cart.png"
          alt="cart"
          width={22}
          height={22}
          className="cursor-pointer"
          onClick={handleCart}
        />
        {userInfo && (
          <div className="absolute -top-4 -right-4 w-6 h-6 bg-primary rounded-full text-white text-sm flex items-center justify-center">
            {counter}
          </div>
        )}
      </div>
      {isCartOpen && (
        <div className="w-max absolute p-4 rounded-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
          {isLoading ? (
            <div className="w-72 h-96 overflow-hidden">
              <Skeleton />
            </div>
          ) : (
            <>
              {!cart.cartItems || cart.cartItems.length === 0 ? (
                <div className="">Cart Is Empty</div>
              ) : (
                <>
                  <h2 className="text-xl font-semibold">Shopping Cart</h2>
                  {/* ITEMS GROUP */}
                  {cart.cartItems.map((item) => (
                    <div className="flex flex-col gap-8" key={item.id}>
                      <div className="flex gap-4">
                        <Image
                          src={item.product.images[0].imageUrl}
                          alt=""
                          width={72}
                          height={96}
                          className="object-cover rounded-md"
                        />
                        <div className="flex flex-col justify-between w-full">
                          {/* TOP */}
                          <div className="">
                            {/* TITTLE */}
                            <div className="flex items-center justify-between gap-8">
                              <h3 className="font-semibold">{item.product.name}</h3>
                              <div className="p-1 bg-gray-50 rounded-sm">
                                ${item.product.newPrice}
                              </div>
                            </div>
                            {/* DESC */}
                            <div className="text-sm to-gray-500">avaliable</div>
                          </div>
                          {/* BOTTOM */}
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Qtt. {item.quantity}</span>
                            <button
                              className="text-blue-500"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* BOTTOM GROUP */}
                  <div className="">
                    <div className="flex items-center justify-between font-semibold">
                      <span className="">Subtotal</span>
                      <span className="">${total}</span>
                    </div>
                    <p className="text-gray-500 text-sm mt-2 mb-4">
                      Shipping and taxes calculated at checkout
                    </p>
                    <div className="flex justify-between text-sm">
                      <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">
                        View Cart
                      </button>
                      <button className="rounded-md py-3 px-4 bg-black text-white">
                        Check Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default CartModel;
