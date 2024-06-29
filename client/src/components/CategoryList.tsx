'use client';

import { useMessage } from '@/hooks/useMessage';
import { useCategoryList } from '@/queries';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import Skeleton from './Skeleton';

const CategoryList = () => {
  const { data: categories, error, isLoading } = useCategoryList();
  const message = useMessage();

  useEffect(() => {
    if (error) {
      message.error('Something went wrong! Please check network again');
    }
  }, [error, message]);

  return (
    <div className="px-4 overflow-x-scroll scrollbar-hide">
      <div className="flex gap-4 md:gap-8">
        {categories?.map((category) => (
          <Link
            href={`/list?cat=${category.id}`}
            className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
            key={category.id}
          >
            <div className="relative bg-slate-100 w-full h-96">
              <Image
                src={category.thumbnail}
                alt={category.thumbnail}
                fill
                sizes="20vw"
                className="object-cover"
              />
            </div>
            <h1 className="mt-4 font-light text-cl tracking-wide">{category.name}</h1>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
