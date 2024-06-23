const EndPoints = {
  category: {
    getCategories: '/categories'
  },
  product: {
    getProducts: '/products',
    getProductDetail: (id: number) => `/products/${id}`,
    getProductVariants: `/product-variant`
  },
  auth: {
    login: '/authentication/sign-in',
    register: '/authentication/sign-up'
  }
};

export default EndPoints;
