import { IProductVariant } from '@/domains';
import { useProductVariants } from '@/queries/product';
import React, { useEffect, useState } from 'react';
import AddProduct from './AddProduct';

interface ProductOptionsProps {
  productId: number;
  variants: IProductVariant[];
}

const getUniqueValues = (array: IProductVariant[], key: keyof IProductVariant): string[] => {
  return Array.from(new Set(array.map((item) => item[key].toString())));
};

const ProductOptions: React.FC<ProductOptionsProps> = ({ variants, productId }) => {
  const [variant, setVariant] = useState<IProductVariant>();

  const colors = getUniqueValues(variants, 'color');
  const sizes = getUniqueValues(variants, 'size');

  const [selectedOptions, setSelectedOptions] = useState<{
    [key: string]: string;
  }>({});

  const { data: productVariant } = useProductVariants({ productId, ...selectedOptions });
  useEffect(() => {
    if (productVariant && productVariant.length > 0) {
      setVariant(productVariant[0]);
    }
  }, [productVariant]);

  const handleOptionChange = (option: string, value: string) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [option]: value
    }));
  };

  const isVariantInStock = (choices: { [key: string]: string }) => {
    return variants.some((variant) => {
      const { color, size } = variant;
      return (
        Object.entries(choices).every(([key, value]) => color === value || size === value) &&
        variant.stock > 0
      );
    });
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <h4 className="font-medium ">Choose a color</h4>
        <ul className="flex items-center gap-3">
          {colors.map((color) => {
            const disabled = !isVariantInStock({
              ...selectedOptions,
              color
            });

            const selected = selectedOptions.color === color;

            const clickHandler = disabled ? undefined : () => handleOptionChange('color', color);

            return (
              <li
                key={color}
                className={`w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative ${
                  disabled ? 'opacity-50' : 'opacity-100'
                }`}
                style={{
                  backgroundColor: color,
                  cursor: disabled ? 'not-allowed' : 'pointer'
                }}
                onClick={clickHandler}
              >
                {selected && (
                  <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
                {disabled && (
                  <div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
              </li>
            );
          })}
        </ul>
        <h4 className="font-medium ">Choose a size</h4>
        <ul className="flex items-center gap-3">
          {sizes.map((size) => {
            const disabled = !isVariantInStock({
              ...selectedOptions,
              size
            });

            const selected = selectedOptions.size === size;

            const clickHandler = disabled ? undefined : () => handleOptionChange('size', size);

            return (
              <li
                key={size}
                className={`ring-1 ${
                  disabled
                    ? 'ring-gray-300 text-gray-300 cursor-not-allowed'
                    : 'ring-primary text-primary cursor-pointer'
                } rounded-md py-1 px-4 text-sm ${selected ? 'bg-primary text-white' : ''}`}
                onClick={clickHandler}
              >
                {size}
              </li>
            );
          })}
        </ul>
      </div>
      <AddProduct stockQuantity={variant?.stock as number} productId={productId} />
    </>
  );
};

export default ProductOptions;
