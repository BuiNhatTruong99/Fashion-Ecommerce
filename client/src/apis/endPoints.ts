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
    signIn: '/authentication/sign-in',
    signUp: '/authentication/sign-up',
    emailVerification: '/authentication/email-verification',
    forgotPassword: '/authentication/forgot-password',
    changePassword: '/authentication/change-password'
  },
  cart: {
    getCart: '/cart',
    addToCart: '/cart/add-item',
    deleteCartItem: '/cart/delete-item'
  }
};

export default EndPoints;
