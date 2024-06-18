'use client';

import { IProductListProps } from '@/domains/params.domain';
import { useProductList } from '@/queries/product';
import Image from 'next/image';
import Link from 'next/link';

const ProductList = ({ categoryId, limit, searchParams }: IProductListProps) => {
  const { data: products } = useProductList({ categoryId, limit, searchParams });

  return (
    <div className="mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {products?.map((product) => (
        <Link
          href={`/product/${product.id}`}
          key={product.id}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
        >
          <div className="relative w-full h-80">
            <Image
              src={product.images[1].imageUrl}
              alt=""
              fill
              sizes="25vw"
              loading="lazy"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            />
            <Image
              src={product.images[0].imageUrl}
              alt=""
              fill
              sizes="25vw"
              loading="lazy"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            />
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className=" text-primary">${product?.newPrice}</span>
          </div>
          <div className="text-sm text-gray-500 line-clamp-2">{product.description}</div>
          <button className="rounded-2xl ring-1 w-max ring-primary text-primary py-2 px-4 text-xs hover:bg-primary hover:text-white">
            Add to Cart
          </button>
        </Link>
      ))}
    </div>
  );
};

export default ProductList;
