interface ICategory {
  id: number;
  name: string;
  thumbnail: string;
}

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

export type { ICategory, IProduct, IProductImage, IProductImagesProps, IProductVariant };
