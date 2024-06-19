import { IProductVariant } from '@/domains';
interface IProductListProps {
  categoryId?: number;
  limit?: number;
  searchParams?: any;
}

interface IProductVariantsProps {
  productId?: number;
  color?: string;
  size?: string;
}

export type { IProductListProps, IProductVariantsProps };
