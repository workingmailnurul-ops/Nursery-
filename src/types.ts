import type React from 'react';

export interface BulkTier {
  minQty: number;
  maxQty?: number;
  pricePerUnit: number;
}

export interface Product {
  id: string;
  name: string;
  scientificName?: string;
  category: 'mango' | 'guava' | 'citrus' | 'jackfruit' | 'exotic' | 'sapodilla' | 'avocado' | 'papaya' | 'pomegranate' | 'dragon-fruit' | 'custard-apple' | string;
  price: number;
  originalPrice?: number;
  salePrice?: number;
  rating: number;
  reviewCount: number;
  badgeText?: string;
  image: string;
  graftType?: string;
  graftAge?: string;
  fruitingTime?: string;
  height?: string;
  potSize?: string;
  potSizes?: string[];
  bulkTiers?: BulkTier[];
  inStock: boolean;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'accent' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'discount' | 'primary' | 'success' | 'warning' | 'neutral';
  size?: 'sm' | 'md';
  className?: string;
}

export interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  showCount?: boolean;
  count?: number;
  className?: string;
}

export interface PriceTagProps {
  price: number;
  originalPrice?: number;
  currency?: string;
  size?: 'sm' | 'md' | 'lg';
  showSavings?: boolean;
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export interface OrderItem {
  id: string;
  name: string;
  image: string;
  category?: string;
  potSize?: string;
  age?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface DeliveryDetails {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export type OrderStatus =
  | 'Placed'
  | 'Processing'
  | 'Confirmed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Received'
  | 'Stock Verification'
  | 'Root Gel Packing'
  | 'Dispatched';

export interface PlacedOrder {
  orderId: string;
  createdAt: string;
  items: OrderItem[];
  deliveryDetails: DeliveryDetails;
  orderType?: 'Retail' | 'Wholesale Bulk';
  paymentMethod: 'cod' | 'bank_transfer' | 'upi';
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  courierName?: string;
  trackingNumber?: string;
  estimatedDeliveryDate?: string;
}

