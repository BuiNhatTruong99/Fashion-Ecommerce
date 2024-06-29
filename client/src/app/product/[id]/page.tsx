'use client';

import ProductImages from '@/components/ProductImages';
import ProductOptions from '@/components/ProductOptions';
import { useProductDetail } from '@/queries/product';

const SinglePage = ({ params }: { params: { id: number } }) => {
  const { data: product } = useProductDetail(params.id);

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-56 relative flex flex-col lg:flex-row gap-16">
      {/* IMAGE */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages images={product?.images} />
      </div>
      {/* TEXT */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product?.name}</h1>
        <p className="text-gray-500">{product?.description}</p>
        <div className="h-[2px] bg-gray-100" />
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">${product?.oldPrice}</h3>
          <h2 className="font-medium text-2xl text-primary">${product?.newPrice}</h2>
        </div>
        <div className="h-[2px] bg-gray-100" />
        <ProductOptions variants={product?.variants ?? []} productId={params.id} />
        <div className="h-[2px] bg-gray-100" />
        <div className="text-sm">
          <h4 className="font-medium mb-4">Product Information</h4>
          <p className="text-gray-500">{product?.information}</p>
        </div>
        <div className="text-sm">
          <h4 className="font-medium mb-4">RETURN & REFUND POLICY</h4>
          <p className="text-gray-500">
            Thank you for shopping at <strong>CÉLINE</strong>. If you are not entirely satisfied
            with your purchase, we are here to help. You have 30 days to return an item from the
            date you received it. Once we receive your item, we will inspect it and notify you that
            we have received your returned item.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="font-medium mb-4 ">SHIPPING INFO</h4>
          <p className="text-gray-500">
            You will be responsible for paying for your own shipping costs for returning your item.
            Shipping costs are non-refundable. If you receive a refund, the cost of return shipping
            will be deducted from your refund.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
