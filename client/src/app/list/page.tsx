import Filter from '@/components/Filter';
import ProductList from '@/components/ProductList';
import Skeleton from '@/components/Skeleton';
import Image from 'next/image';
import { Suspense } from 'react';

const SinglePage = ({ searchParams }: { searchParams: any }) => {
  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative">
      <div className="hidden bg-pink-50 px-4 sm:flex justify-between h-64">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Grab up to 50% off on <br />
            Selected Products
          </h1>
          <button className="rounded-3xl bg-primary text-white w-max py-3 px-5 text-sm">Buy Now</button>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="" fill sizes="100%" className="object-contain" />
        </div>
      </div>
      <Filter />
      <h1 className="mt-12 text-xl font-semibold">Suggest for you</h1>
      <Suspense fallback={<Skeleton />}>
        <ProductList categoryId={searchParams.cat} searchParams={searchParams} />
      </Suspense>
    </div>
  );
};

export default SinglePage;
