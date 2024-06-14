interface ICategory {
  id: number;
  name: string;
  thumbnail: string;
}

interface IProduct {
  id: number;
  name: string;
  description: string;
  information: string;
  category: ICategory;
  images: IProductImage[];
}

interface IProductImage {
  id: number;
  imageUrl: string;
}

interface IProductImagesProps {
  images?: IProductImage[];
}

export type { ICategory, IProduct, IProductImage, IProductImagesProps };
