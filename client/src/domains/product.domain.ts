interface IProduct {
  id: number;
  name: string;
  oldPrice: number;
  newPrice: number;
  description: string;
  information: string;
  category: ICategory;
  images: IProductImage[];
  variants: IProductVariant[];
}

interface IProductImage {
  id: number;
  imageUrl: string;
}

interface IProductImagesProps {
  images?: IProductImage[];
}

interface IProductVariant {
  id: number;
  color: string;
  size: string;
  price: number;
  oldPrice: number;
  newPrice: number;
  stock: number;
}

interface ICategory {
  id: number;
  name: string;
  thumbnail: string;
}

interface IProductListProps {
  categoryId?: number;
  limit?: number;
  searchParams?: any;
  title?: string;
}

interface IProductVariantsProps {
  productId?: number;
  color?: string;
  size?: string;
}

export type {
  ICategory,
  IProduct,
  IProductImage,
  IProductImagesProps,
  IProductVariant,
  IProductListProps,
  IProductVariantsProps
};
