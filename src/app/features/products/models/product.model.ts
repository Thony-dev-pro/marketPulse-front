export interface ProductOptions {
  type: 'colors';
  values: string[];
}

export interface ProductOptionsText {
  type: 'text';
  value: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  thumbBg: string;
  categories: string[];
  options: ProductOptions | ProductOptionsText;
  price: number;
  stock: number;
  sku: string;
  rating: number;
  reviewCount: number;
}
