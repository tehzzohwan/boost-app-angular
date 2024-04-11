export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CartProduct extends Product {
  qty: number;
}

export interface ApiResponse {
  message: string;
  data: Result;
}

export interface ApiResponseII {
  message: string;
  data: Product;
}

export interface ApiResponseIII {
  message: string;
  data: Product[];
}

interface Result {
  totalItems: number;
  products: Product[];
  totalPages: number;
  currentPage: number;
}
