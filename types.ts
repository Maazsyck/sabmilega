
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  brand: string;
  discount: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  name: string;
  isLoggedIn: boolean;
}

export enum View {
  HOME = 'HOME',
  PRODUCT_DETAIL = 'PRODUCT_DETAIL',
  CART = 'CART',
  SEARCH_RESULTS = 'SEARCH_RESULTS'
}
