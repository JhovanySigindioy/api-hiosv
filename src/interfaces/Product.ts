export interface Product {
  id: number;
  name: string;
  cost: number;
  sale_price: number;
  quantity: number;
  active: boolean;
  brand: { name: string; }[];
  category: { name: string; }[];
  location: { name: string; }[];
}

export interface ProductUpdate {
  id: number;
  barcode: number;
  name: string;
  description: string;
  cost: number;
  sale_price: number;
  quantity: number;
  brand: number;
  active: boolean;
  category: number;
  location: number;
  img_product: string;

}