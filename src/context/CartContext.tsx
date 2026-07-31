import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types';

export interface CartItem {
  product: Product;
  quantity: number;
  selectedPotSize?: string;
  selectedAge?: string;
  baseUnitPrice?: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (
    product: Product,
    quantity?: number,
    selectedPotSize?: string,
    selectedAge?: string
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
}

const CART_STORAGE_KEY = 'green_heaven_nursery_cart_v2';
const LEGACY_CART_STORAGE_KEY = 'amtola_nursery_cart_v2';

const DEFAULT_ITEMS: CartItem[] = [
  {
    product: {
      id: 'prod-1',
      name: 'Haribhanga Grafted Mango Tree',
      category: 'mango',
      price: 350,
      originalPrice: 500,
      rating: 4.9,
      reviewCount: 142,
      badgeText: 'Save 30%',
      image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
      graftType: 'V-Grafted Mother Scion',
      fruitingTime: '12 - 18 Months',
      height: '2.5 - 3 Feet',
      inStock: true,
      description: 'Fibreless pulp sweet mango variety with certified rootstock.',
    },
    quantity: 2,
    selectedPotSize: '10-inch Nursery Soil Bag',
    selectedAge: '1.5 Year Grafted (Ready to Branch)',
    baseUnitPrice: 350,
  },
  {
    product: {
      id: 'prod-2',
      name: 'Thai 7 Seedless Guava Plant',
      category: 'guava',
      price: 280,
      originalPrice: 350,
      rating: 4.8,
      reviewCount: 98,
      badgeText: 'Save 20%',
      image: 'https://images.unsplash.com/photo-1536511157201-5222b3a67231?auto=format&fit=crop&w=800&q=80',
      graftType: 'Air-Layered (Guti Kalam)',
      fruitingTime: '6 - 10 Months',
      height: '2 Feet',
      inStock: true,
      description: 'Crisp seedless guava with high fruit yield.',
    },
    quantity: 10,
    selectedPotSize: '12-inch Heavy Grow Bag (+₹80)',
    selectedAge: '1.5 Year Grafted (Ready to Branch)',
    baseUnitPrice: 360,
  },
];

export const getEffectiveUnitPrice = (basePrice: number, quantity: number) => {
  if (quantity >= 50) {
    return Math.round(basePrice * 0.65);
  }
  if (quantity >= 10) {
    return Math.round(basePrice * 0.8);
  }
  return basePrice;
};

// Helper for unique key per item variant combination
export const getCartItemId = (
  productId: string,
  potSize?: string,
  age?: string
) => {
  return `${productId}-${potSize || 'std'}-${age || 'std'}`;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY) || localStorage.getItem(LEGACY_CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    }
    return DEFAULT_ITEMS;
  });

  // Save to localStorage on cart state changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  const addToCart = (
    product: Product,
    quantity: number = 1,
    selectedPotSize?: string,
    selectedAge?: string
  ) => {
    const pot = selectedPotSize || '10-inch Nursery Soil Bag';
    const age = selectedAge || '1.5 Year Grafted (Ready to Branch)';
    const baseUnit = product.price;

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedPotSize === pot &&
          item.selectedAge === age
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      return [
        ...prevItems,
        {
          product,
          quantity,
          selectedPotSize: pot,
          selectedAge: age,
          baseUnitPrice: baseUnit,
        },
      ];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          getCartItemId(item.product.id, item.selectedPotSize, item.selectedAge) !== cartItemId &&
          item.product.id !== cartItemId
      )
    );
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => {
        const itemId = getCartItemId(item.product.id, item.selectedPotSize, item.selectedAge);
        if (itemId === cartItemId || item.product.id === cartItemId) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const subtotal = cartItems.reduce((acc, item) => {
    const base = item.baseUnitPrice || item.product.price;
    const effectivePrice = getEffectiveUnitPrice(base, item.quantity);
    return acc + effectivePrice * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

