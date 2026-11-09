export interface ProductCategory {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  category_id: number;
  description: string;
  unit: string;
  status: number;
  category: ProductCategory;
}
