const EndPoints = {
  category: {
    getCategories: '/categories'
  },
  product: {
    getProducts: '/products',
    getProductDetail: (id: number) => `/products/${id}`,
    getProductVariants: `/product-variant`
  }
};

export default EndPoints;
