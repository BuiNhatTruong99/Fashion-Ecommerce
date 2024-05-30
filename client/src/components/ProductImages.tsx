'use client';

import Image from 'next/image';
import { useState } from 'react';

const images = [
  {
    id: 1,
    url: 'https://images.pexels.com/photos/984619/pexels-photo-984619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 2,
    url: 'https://images.pexels.com/photos/458649/pexels-photo-458649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 3,
    url: 'https://images.pexels.com/photos/242149/pexels-photo-242149.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: 4,
    url: 'https://images.pexels.com/photos/744365/pexels-photo-744365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

const ProductImages = () => {
  const [index, setIndex] = useState(0);

  return (
    <div className="">
      <div className="h-[500px] relative">
        <Image src={images[index].url} alt="" fill sizes="50vw" className="object-cover rounded-md" />
      </div>
      <div className="flex justify-between gap-4 mt-8">
        {images.map((img, index) => (
          <div className="w-1/4 h-32 relative gap-4 mt-8 cursor-pointer" key={img.id} onClick={() => setIndex(index)}>
            <Image src={img.url} alt="" fill sizes="30vw" className="object-cover rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
