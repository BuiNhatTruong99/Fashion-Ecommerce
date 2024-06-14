'use client';

import { IProductImagesProps } from '@/domains';
import Image from 'next/image';
import { useState } from 'react';

const ProductImages = ({ images }: IProductImagesProps) => {
  const [index, setIndex] = useState(0);

  if (!images || images.length === 0) {
    return <div className="text-center text-gray-500">No images available</div>;
  }

  return (
    <div className="">
      <div className="h-[500px] relative">
        <Image src={images[index].imageUrl} alt="" fill sizes="50vw" className="object-cover rounded-md" />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {images.map((img, index) => (
          <div className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer" key={img.id} onClick={() => setIndex(index)}>
            <Image src={img.imageUrl} alt="" fill sizes="30vw" className="object-cover rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
