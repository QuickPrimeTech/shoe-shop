export interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
}
export interface CartItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number;
}
