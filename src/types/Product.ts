// src/types/Product.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  imageUrl: string;
  category: string;
  expirationDate: string; // ISO 8601 format: "YYYY-MM-DD"
}
