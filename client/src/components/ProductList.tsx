import Image from 'next/image';
import Link from 'next/link';

const ProductList = () => {
  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      <Link href="/" className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
        <div className="relative w-full h-80">
          <Image
            src="https://images.pexels.com/photos/1214212/pexels-photo-1214212.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
          <Image
            src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Prod Name</span>
          <span className="font-semibold">$50</span>
        </div>
        <div className="text-sm text-gray-500">Des</div>
        <button className="rounded-2xl ring-1 w-max ring-primary text-primary py-2 px-4 text-xs hover:bg-primary hover:text-white">
          Add to Cart
        </button>
      </Link>
      <Link href="/" className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
        <div className="relative w-full h-80">
          <Image
            src="https://images.pexels.com/photos/1214212/pexels-photo-1214212.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
          <Image
            src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Prod Name</span>
          <span className="font-semibold">$50</span>
        </div>
        <div className="text-sm text-gray-500">Des</div>
        <button className="rounded-2xl ring-1 w-max ring-primary text-primary py-2 px-4 text-xs hover:bg-primary hover:text-white">
          Add to Cart
        </button>
      </Link>
      <Link href="/" className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
        <div className="relative w-full h-80">
          <Image
            src="https://images.pexels.com/photos/1214212/pexels-photo-1214212.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
          <Image
            src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Prod Name</span>
          <span className="font-semibold">$50</span>
        </div>
        <div className="text-sm text-gray-500">Des</div>
        <button className="rounded-2xl ring-1 w-max ring-primary text-primary py-2 px-4 text-xs hover:bg-primary hover:text-white">
          Add to Cart
        </button>
      </Link>
      <Link href="/" className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]">
        <div className="relative w-full h-80">
          <Image
            src="https://images.pexels.com/photos/1214212/pexels-photo-1214212.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
          <Image
            src="https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            fill
            sizes="25vw"
            className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
          />
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Prod Name</span>
          <span className="font-semibold">$50</span>
        </div>
        <div className="text-sm text-gray-500">Des</div>
        <button className="rounded-2xl ring-1 w-max ring-primary text-primary py-2 px-4 text-xs hover:bg-primary hover:text-white">
          Add to Cart
        </button>
      </Link>
    </div>
  );
};

export default ProductList;
