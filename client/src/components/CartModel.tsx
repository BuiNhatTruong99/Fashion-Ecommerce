'use client';

import Image from 'next/image';

const CartModel = () => {
  const cartItems = true;

  return (
    <div className="w-max absolute p-4 rounded-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-white top-12 right-0 flex flex-col gap-6 z-20">
      {!cartItems ? (
        <div className="">Cart Is Empty</div>
      ) : (
        <>
          <h2 className="text-xl font-semibold">Shopping Cart</h2>
          {/* ITEMS GROUP */}
          <div className="flex flex-col gap-8">
            <div className="flex gap-4">
              <Image
                src="https://images.pexels.com/photos/1214212/pexels-photo-1214212.jpeg?auto=compress&cs=tinysrgb&w=600"
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
                    <h3 className="font-semibold">Prod name</h3>
                    <div className="p-1 bg-gray-50 rounded-sm">$49</div>
                  </div>
                  {/* DESC */}
                  <div className="text-sm to-gray-500">avaliable</div>
                </div>
                {/* BOTTOM */}
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Qtt. 2</span>
                  <span className="text-blue-500">remove</span>
                </div>
              </div>
            </div>
          </div>
          {/* BOTTOM GROUP */}
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">$49</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">Shipping and taxes calculated at checkout</p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 ring-gray-300">View Cart</button>
              <button className="rounded-md py-3 px-4 bg-black text-white">Check Out</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModel;
