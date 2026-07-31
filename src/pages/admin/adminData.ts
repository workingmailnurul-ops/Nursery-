import { Product, PlacedOrder } from '../../types';
import { PRODUCTS } from '../../data/products';

export interface AdminCustomer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  totalOrders: number;
  totalSpent: number;
  joinedDate: string;
  status: 'active' | 'vip' | 'inactive';
}

export interface Coupon {
  id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  expiryDate: string;
  usageCount: number;
  usageLimit: number;
  isActive: boolean;
}

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
  popularVariety: string;
  image: string;
  description: string;
  status: 'active' | 'hidden';
}

export interface AdminBlogPost {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  status: 'published' | 'draft';
  image: string;
  views: number;
}

// Default Coupons Data
export const INITIAL_COUPONS: Coupon[] = [
  {
    id: 'c-1',
    code: 'GREEN100',
    description: 'Flat ₹100 discount on orders over ₹1,000',
    discountType: 'fixed',
    discountValue: 100,
    minOrderValue: 1000,
    expiryDate: '2026-12-31',
    usageCount: 142,
    usageLimit: 500,
    isActive: true,
  },
  {
    id: 'c-[#FF5252]',
    code: 'ROOFTOP15',
    description: '15% off on all Rooftop Fruit Plant Combos',
    discountType: 'percentage',
    discountValue: 15,
    minOrderValue: 1500,
    expiryDate: '2026-09-30',
    usageCount: 89,
    usageLimit: 250,
    isActive: true,
  },
  {
    id: 'c-3',
    code: 'FREESHIP',
    description: 'Free courier shipping across all districts',
    discountType: 'fixed',
    discountValue: 120,
    minOrderValue: 2000,
    expiryDate: '2026-08-15',
    usageCount: 230,
    usageLimit: 1000,
    isActive: true,
  },
  {
    id: 'c-4',
    code: 'MONSOON20',
    description: '20% Special Monsoon Planting Discount',
    discountType: 'percentage',
    discountValue: 20,
    minOrderValue: 3000,
    expiryDate: '2026-08-31',
    usageCount: 45,
    usageLimit: 100,
    isActive: true,
  },
];

// Default Customers Data
export const INITIAL_CUSTOMERS: AdminCustomer[] = [
  {
    id: 'cust-1',
    name: 'Anisur Rahman',
    email: 'anisur.pune@gmail.com',
    phone: '+91 98765 43210',
    city: 'Pune, Maharashtra',
    totalOrders: 6,
    totalSpent: 4850,
    joinedDate: 'Jan 15, 2026',
    status: 'vip',
  },
  {
    id: 'cust-2',
    name: 'Tariqul Islam',
    email: 'tariq.dhaka@gmail.com',
    phone: '+880 1711 223344',
    city: 'Uttara, Dhaka',
    totalOrders: 4,
    totalSpent: 3900,
    joinedDate: 'Feb 10, 2026',
    status: 'active',
  },
  {
    id: 'cust-3',
    name: 'Priya Sharma',
    email: 'priya.kolkata@yahoo.com',
    phone: '+91 98310 11223',
    city: 'Kolkata, WB',
    totalOrders: 3,
    totalSpent: 2650,
    joinedDate: 'Mar 22, 2026',
    status: 'active',
  },
  {
    id: 'cust-4',
    name: 'Mahbub Hassan',
    email: 'mahbub.sylhet@gmail.com',
    phone: '+880 1819 998877',
    city: 'Zindabazar, Sylhet',
    totalOrders: 8,
    totalSpent: 7200,
    joinedDate: 'Dec 05, 2025',
    status: 'vip',
  },
  {
    id: 'cust-5',
    name: 'Shirin Akter',
    email: 'shirin.ctg@gmail.com',
    phone: '+880 1912 334455',
    city: 'Panchlaish, Chittagong',
    totalOrders: 2,
    totalSpent: 1800,
    joinedDate: 'May 18, 2026',
    status: 'active',
  },
  {
    id: 'cust-6',
    name: 'Ramesh Kumar',
    email: 'ramesh.k@gmail.com',
    phone: '+91 97654 12345',
    city: 'Mumbai, MH',
    totalOrders: 1,
    totalSpent: 950,
    joinedDate: 'Jul 02, 2026',
    status: 'active',
  },
];

// Default Categories Data
export const INITIAL_CATEGORIES: AdminCategory[] = [
  {
    id: 'cat-1',
    name: 'Grafted Mango Saplings',
    slug: 'mango',
    itemCount: 8,
    popularVariety: 'Miyazaki & Alphonso',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80',
    description: 'Mother-scion grafted mango plants engineered for early 12-month fruit yield.',
    status: 'active',
  },
  {
    id: 'cat-2',
    name: 'Guava Plant Varieties',
    slug: 'guava',
    itemCount: 5,
    popularVariety: 'Thai-7 Super Sweet & L-49',
    image: 'https://images.unsplash.com/photo-1536511157201-5222b3a67231?auto=format&fit=crop&w=400&q=80',
    description: 'High-yielding guava varieties suited for rooftop grow bags and home orchards.',
    status: 'active',
  },
  {
    id: 'cat-3',
    name: 'Citrus & Malta Trees',
    slug: 'citrus',
    itemCount: 6,
    popularVariety: 'Bari-1 Malta & Kagzi Lemon',
    image: 'https://images.unsplash.com/photo-1582979512210-99b6a53385f9?auto=format&fit=crop&w=400&q=80',
    description: 'Sweet juicy citrus & lemon saplings thriving in tropical home containers.',
    status: 'active',
  },
  {
    id: 'cat-4',
    name: 'Exotic Fruit Plants',
    slug: 'exotic',
    itemCount: 7,
    popularVariety: 'Red Dragon Fruit & Passion Fruit',
    image: 'https://images.unsplash.com/photo-1527325678964-54921661f888?auto=format&fit=crop&w=400&q=80',
    description: 'Rare imported fruiting varieties for avid plant collectors and rooftop enthusiasts.',
    status: 'active',
  },
  {
    id: 'cat-5',
    name: 'Indoor & Air Purifiers',
    slug: 'indoor',
    itemCount: 9,
    popularVariety: 'Snake Plant & Peace Lily',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=80',
    description: 'Low-maintenance oxygen boosting indoor plants for homes and office spaces.',
    status: 'active',
  },
  {
    id: 'cat-6',
    name: 'Organic Plant Care & Soils',
    slug: 'plant-care',
    itemCount: 12,
    popularVariety: 'Vermicompost & Neem Oil Spray',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=400&q=80',
    description: '100% organic fertilizers, growth boosters, and potting soil mixes.',
    status: 'active',
  },
];

// Default Blog Posts Data
export const INITIAL_BLOG_POSTS: AdminBlogPost[] = [
  {
    id: 'b-1',
    title: 'How to Care for Newly Arrived Grafted Saplings',
    slug: 'grafted-sapling-care-guide',
    category: 'Plant Care',
    author: 'Dr. Anita Roy',
    date: 'July 18, 2026',
    readTime: '4 min read',
    status: 'published',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
    views: 1420,
  },
  {
    id: 'b-2',
    title: 'Top 5 Fruit Trees Perfect for Rooftop Garden Containers',
    slug: 'top-rooftop-fruit-trees',
    category: 'Rooftop Gardening',
    author: 'Vikramaditya Sharma',
    date: 'July 10, 2026',
    readTime: '6 min read',
    status: 'published',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    views: 2150,
  },
  {
    id: 'b-3',
    title: 'Organic Pest Control Tips for Mango & Citrus Flowers',
    slug: 'organic-pest-control-guide',
    category: 'Pest Management',
    author: 'Dr. Anita Roy',
    date: 'June 28, 2026',
    readTime: '5 min read',
    status: 'published',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80',
    views: 980,
  },
  {
    id: 'b-4',
    title: 'Monsoon Sapling Planting Masterclass & Root Gel Setup',
    slug: 'monsoon-planting-masterclass',
    category: 'Season Special',
    author: 'Tanvir Hossain',
    date: 'July 25, 2026',
    readTime: '3 min read',
    status: 'draft',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80',
    views: 0,
  },
];

// Monthly Analytics Data for Recharts
export const MONTHLY_SALES_DATA = [
  { month: 'Jan', revenue: 42000, orders: 120, customers: 85 },
  { month: 'Feb', revenue: 58000, orders: 165, customers: 110 },
  { month: 'Mar', revenue: 74000, orders: 210, customers: 145 },
  { month: 'Apr', revenue: 69000, orders: 195, customers: 130 },
  { month: 'May', revenue: 95000, orders: 270, customers: 180 },
  { month: 'Jun', revenue: 112000, orders: 320, customers: 220 },
  { month: 'Jul', revenue: 138000, orders: 390, customers: 265 },
];

export const CATEGORY_SALES_DATA = [
  { name: 'Grafted Mango', value: 45, color: '#2F5233' },
  { name: 'Guava Plants', value: 20, color: '#10B981' },
  { name: 'Citrus & Malta', value: 15, color: '#E8862E' },
  { name: 'Exotic Fruits', value: 12, color: '#3B82F6' },
  { name: 'Indoor Plants', value: 8, color: '#8B5CF6' },
];
