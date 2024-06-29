import CategoryList from '@/components/CategoryList';
import ProductList from '@/components/ProductList';
import Skeleton from '@/components/Skeleton';
import Slider from '@/components/Slider';
import { Suspense } from 'react';

export default function Home() {
  return (
    <div>
      <Slider />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-56">
        <h1 className="text-2xl">News Products</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList categoryId={process.env.FEATURE_PRODUCT_CATEGORY} limit={4} />
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 mb-12">Categories</h1>
        <Suspense fallback={<Skeleton />}>
          <CategoryList />
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-56">
        <h1 className="text-2xl">News Products</h1>
        <Suspense fallback={<Skeleton />}>
          <ProductList limit={4} />
        </Suspense>
      </div>
    </div>
  );
}
