export type Category = {
  id: string;
  title: string;
  icon: string;
  image: string;
  color: string;
  parentId?: string;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  categoryId: string;
  image: string;
  gallery: string[];
  weight: string;
  variants: string[];
  price: number;
  mrp: number;
  rating: number;
  deliveryMinutes: number;
  description: string;
  nutrition: Record<string, string>;
  tags: string[];
  inStock: boolean;
};

export type Address = {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  line1: string;
  line2: string;
  landmark: string;
  latitude: number;
  longitude: number;
};

export type PromoCode = {
  id: string;
  code: string;
  description: string;
  discountPercent: number;
  maxDiscount: number;
};

export type OrderStatus = 'Order Placed' | 'Picking' | 'Packed' | 'Out for Delivery' | 'Delivered';

export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  items: Array<{productId: string; quantity: number}>;
};

export type DeliveryAgent = {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  latitude: number;
  longitude: number;
  etaMinutes: number;
};

export type CartLine = {
  productId: string;
  quantity: number;
};
