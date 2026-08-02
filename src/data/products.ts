import { Product } from '../types';

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  ctaText: string;
  ctaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  imageUrl: string;
  tagline: string;
}

export interface FruitCategoryTile {
  id: string;
  name: string;
  slug: string;
  itemCount: number;
  image: string;
  popularVariety: string;
}

export interface Testimonial {
  id: string;
  name: string;
  city: string;
  rating: number;
  comment: string;
  purchasedPlant: string;
  date: string;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  slug: string;
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    title: 'Grow Your Own Grafted Fruit Forest',
    subtitle: '100% Genuine Certified Mother-Plant Scions. Early fruiting varieties ready to yield within 12-18 months.',
    badge: 'Limited Season High-Yield Stock',
    ctaText: 'Shop Bestsellers Now',
    ctaLink: '/shop',
    secondaryCtaText: 'Enquire Bulk Order',
    secondaryCtaLink: '#bulk-order',
    imageUrl: 'https://images.unsplash.com/photo-1595231712325-2fecd1f532a3?auto=format&fit=crop&w=1600&q=80',
    tagline: 'Guaranteed Live Plant Courier Shipping',
  },
  {
    id: 'slide-2',
    title: 'Exotic & Rooftop Fruit Saplings',
    subtitle: 'Compact dwarf grafted varieties specially bred for balcony pots, roof gardens, and home orchards.',
    badge: 'Rooftop Gardening Special',
    ctaText: 'Explore Dwarf Saplings',
    ctaLink: '/category/exotic',
    secondaryCtaText: 'Download Care Guide',
    secondaryCtaLink: '/care-guide',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
    tagline: 'Fresh Sweet Fruits Year Round',
  },
  {
    id: 'slide-3',
    title: 'Commercial Orchard & Wholesale Packs',
    subtitle: 'Bulk grafted plants for farmers, agricultural landscapers, and commercial growers at factory rates.',
    badge: 'Bulk Discount Up To 35% OFF',
    ctaText: 'Get Wholesale Quote',
    ctaLink: '#bulk-order',
    secondaryCtaText: 'Contact Nursery Team',
    secondaryCtaLink: '/contact',
    imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1600&q=80',
    tagline: 'Over 50,000+ Happy Growers Nationwide',
  },
];

export const FRUIT_CATEGORIES: FruitCategoryTile[] = [
  {
    id: 'cat-mango',
    name: 'Mango',
    slug: 'mango',
    itemCount: 14,
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80',
    popularVariety: 'Alphonso, Kesar & Amrapali',
  },
  {
    id: 'cat-guava',
    name: 'Guava',
    slug: 'guava',
    itemCount: 8,
    image: 'https://images.unsplash.com/photo-1536511157201-5222b3a67231?auto=format&fit=crop&w=400&q=80',
    popularVariety: 'L-49 Sardar & Red Diamond',
  },
  {
    id: 'cat-lemon',
    name: 'Lemon & Citrus',
    slug: 'citrus',
    itemCount: 10,
    image: 'https://images.unsplash.com/photo-1534531141161-e416040523f2?auto=format&fit=crop&w=400&q=80',
    popularVariety: 'Nagpur Santra & Kagzi Lime',
  },
  {
    id: 'cat-papaya',
    name: 'Papaya',
    slug: 'papaya',
    itemCount: 5,
    image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=400&q=80',
    popularVariety: 'Red Lady 786 Hybrid',
  },
  {
    id: 'cat-pomegranate',
    name: 'Pomegranate (Anaar)',
    slug: 'pomegranate',
    itemCount: 6,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=400&q=80',
    popularVariety: 'Bhagwa Red & Ruby',
  },
  {
    id: 'cat-chikoo',
    name: 'Chikoo (Sapodilla)',
    slug: 'sapodilla',
    itemCount: 4,
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=400&q=80',
    popularVariety: 'Kalipatti & Cricket Ball',
  },
  {
    id: 'cat-custard',
    name: 'Custard Apple (Sitaphal)',
    slug: 'custard-apple',
    itemCount: 5,
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80',
    popularVariety: 'Balanagar & Thai Golden',
  },
  {
    id: 'cat-dragon',
    name: 'Dragon Fruit',
    slug: 'dragon-fruit',
    itemCount: 7,
    image: 'https://images.unsplash.com/photo-1527325678964-54921661f888?auto=format&fit=crop&w=400&q=80',
    popularVariety: 'Red Flesh Cuttings',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Money Plant, Scindapsus ( Pack of 3 ) - Plant',
    scientificName: 'Epipremnum aureum',
    category: 'plants',
    price: 758,
    originalPrice: 947,
    rating: 4.8,
    reviewCount: 161,
    badgeText: 'SALE',
    image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80',
    graftType: 'Potted Pack of 3',
    fruitingTime: 'Indoor Air Purifier',
    height: '6 - 10 Inches',
    inStock: true,
    description: 'Set of 3 healthy Money Plants in black nursery pots. Excellent low-maintenance air-purifying indoor greenery.',
  },
  {
    id: 'prod-2',
    name: 'Top 3 Mosquito Repellent Plants',
    scientificName: 'Cymbopogon & Pelargonium',
    category: 'plants',
    price: 980,
    originalPrice: 1225,
    rating: 4.7,
    reviewCount: 35,
    badgeText: 'SALE',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    graftType: 'Pack of 3 Herbal Plants',
    fruitingTime: 'Natural Insect Barrier',
    height: '1 - 1.5 Feet',
    inStock: true,
    description: 'Natural aromatic plants including Lemongrass, Citronella, and Marigold that keep mosquitoes and pests away naturally.',
  },
  {
    id: 'prod-3',
    name: 'Top 5 Plants for Decoration on Auspicious Occasion',
    scientificName: 'Decor Assortment Pack',
    category: 'plants',
    price: 1150,
    originalPrice: 1499,
    rating: 4.9,
    reviewCount: 88,
    badgeText: 'SALE',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=800&q=80',
    graftType: 'Potted Pack of 5',
    fruitingTime: 'Decorative Foliage',
    height: '1 Foot',
    inStock: true,
    description: 'Handpicked decorative indoor plants ideal for festivities, housewarming gifts, and living room corner aesthetics.',
  },
  {
    id: 'prod-4',
    name: 'Top 5 Plants to Bring Goodluck',
    scientificName: 'Auspicious Vastu Pack',
    category: 'plants',
    price: 1299,
    originalPrice: 1699,
    rating: 4.8,
    reviewCount: 44,
    badgeText: 'SALE',
    image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
    graftType: 'Pack of 5 Auspicious Plants',
    fruitingTime: 'Vastu & Feng Shui Positive Energy',
    height: '8 - 12 Inches',
    inStock: true,
    description: 'Includes Peace Lily, Jade Plant, Golden Pothos, Snake Plant, and Lucky Bamboo for positive home vibes.',
  },
  {
    id: 'prod-5',
    name: 'Red Diamond Thai Guava',
    scientificName: 'Psidium guajava "Red Diamond"',
    category: 'guava',
    price: 420,
    originalPrice: 550,
    rating: 4.85,
    reviewCount: 64,
    badgeText: 'Save 24%',
    image: 'https://images.unsplash.com/photo-1536511157201-5222b3a67231?auto=format&fit=crop&w=800&q=80',
    graftType: 'Air Layered Graft',
    fruitingTime: '8 - 12 Months',
    height: '2 Feet',
    inStock: true,
    description: 'Ruby red interior guava with crunchy texture and honey-like sweetness.',
  },
  {
    id: 'prod-6',
    name: 'All-Season Katimon Mango',
    scientificName: 'Mangifera indica "Katimon"',
    category: 'mango',
    price: 490,
    originalPrice: 650,
    rating: 4.9,
    reviewCount: 112,
    badgeText: '3 Times/Year Yield',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
    graftType: 'V-Grafted',
    fruitingTime: '8 - 12 Months',
    height: '2.5 Feet',
    inStock: true,
    description: 'Famous Thai variety that flowers and yields sweet mangoes thrice a year.',
  },
  {
    id: 'prod-7',
    name: 'Kagzi Seedless Lemon Plant',
    scientificName: 'Citrus aurantiifolia "Kagzi"',
    category: 'citrus',
    price: 250,
    originalPrice: 320,
    rating: 4.65,
    reviewCount: 88,
    badgeText: 'Save 22%',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=800&q=80',
    graftType: 'Guti Kalam',
    fruitingTime: '6 Months',
    height: '1.5 - 2 Feet',
    inStock: true,
    description: 'Highly aromatic, thin-skinned juicy lemon tree suitable for balcony pots.',
  },
  {
    id: 'prod-8',
    name: 'Red Lady Hybrid Papaya Plant',
    scientificName: 'Carica papaya "Red Lady 786"',
    category: 'exotic',
    price: 180,
    originalPrice: 220,
    rating: 4.75,
    reviewCount: 130,
    badgeText: 'High Yield',
    image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?auto=format&fit=crop&w=800&q=80',
    graftType: 'Tissue Culture Hybrid',
    fruitingTime: '6 Months',
    height: '1.5 Feet',
    inStock: true,
    description: 'Early flowering dwarf papaya yielding 30-50 kg sweet red papaya per plant.',
  },
];

export const COMBO_PACKS: Product[] = [
  {
    id: 'combo-1',
    name: 'Rooftop Fruit Orchard Combo (3 Plants)',
    category: 'mango',
    price: 850,
    originalPrice: 1250,
    rating: 4.95,
    reviewCount: 88,
    badgeText: 'Save 32% Bundle',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    graftType: 'Dwarf Grafted Trio',
    fruitingTime: '12 Months',
    height: '2 - 2.5 Feet',
    inStock: true,
    description: 'Includes 1x Alphonso Mango, 1x L-49 Guava, and 1x Nagpur Santra sapling.',
  },
  {
    id: 'combo-2',
    name: 'Citrus & Vitamin C Super Pack (3 Plants)',
    category: 'citrus',
    price: 750,
    originalPrice: 1050,
    rating: 4.88,
    reviewCount: 62,
    badgeText: 'Best Value',
    image: 'https://images.unsplash.com/photo-1534531141161-e416040523f2?auto=format&fit=crop&w=800&q=80',
    graftType: 'Grafted Citrus Trio',
    fruitingTime: '8 Months',
    height: '2 Feet',
    inStock: true,
    description: 'Includes 1x Kagzi Lemon, 1x Nagpur Santra, and 1x Mosambi Sweet Lime plant.',
  },
  {
    id: 'combo-3',
    name: 'Exotic Sweet Fruit Trio Pack',
    category: 'exotic',
    price: 1350,
    originalPrice: 1900,
    rating: 4.92,
    reviewCount: 45,
    badgeText: 'Save 29%',
    image: 'https://images.unsplash.com/photo-1527325678964-54921661f888?auto=format&fit=crop&w=800&q=80',
    graftType: 'Grafted Exotic Pack',
    fruitingTime: '12 - 18 Months',
    height: '2.5 Feet',
    inStock: true,
    description: 'Includes 1x Red Diamond Guava, 1x All-Season Katimon Mango, and 1x Red Dragon Fruit cutting.',
  },
  {
    id: 'combo-4',
    name: 'Sweet Mango Trio Variety Pack',
    category: 'mango',
    price: 1050,
    originalPrice: 1550,
    rating: 4.9,
    reviewCount: 79,
    badgeText: 'Mango Lover Special',
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
    graftType: 'V-Grafted Trio',
    fruitingTime: '12 Months',
    height: '2.5 - 3 Feet',
    inStock: true,
    description: 'Includes 1x Alphonso, 1x Kesar, and 1x Amrapali grafted mango trees.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Dr. Rajesh Sharma',
    city: 'Kolkata, WB',
    rating: 5,
    comment: 'The Alphonso and Nagpur Santra saplings arrived in pristine condition! Soil was moist in the wooden frame box. Flowering started within 8 months on my terrace garden.',
    purchasedPlant: 'Rooftop Fruit Orchard Combo',
    date: '12 days ago',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 't-2',
    name: 'Vikram Patel',
    city: 'Ahmedabad, GJ',
    rating: 5,
    comment: '100% genuine mother plant scions! I ordered 25 Katimon mango trees for my orchard project near Junagadh. Amargaon Nursery provided excellent planting advice.',
    purchasedPlant: 'Katimon Grafted Mango (25 pcs)',
    date: '3 weeks ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 't-3',
    name: 'Priya Iyer',
    city: 'Bengaluru, KA',
    rating: 5,
    comment: 'Red Diamond guava fruited heavily in my 18-inch pot on my apartment balcony. The fruits are super sweet and crisp. Packaging quality is unmatched!',
    purchasedPlant: 'Thai Red Diamond Guava',
    date: '1 month ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
  },
  {
    id: 't-4',
    name: 'Amitabha Roy',
    city: 'Siliguri, WB',
    rating: 5,
    comment: 'Fast India Post / Courier dispatch and genuine scions certified by nursery tag. Highly recommend Amargaon Nursery to every plant enthusiast across India.',
    purchasedPlant: 'Miyazaki Japanese Red Mango',
    date: '1 month ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b-1',
    title: 'How to Care for Newly Arrived Grafted Saplings',
    excerpt: 'Step-by-step guide on acclimatizing rootstock after transit, soil preparation with organic compost, and graft union protection.',
    category: 'Plant Care',
    date: 'July 18, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
    slug: 'grafted-sapling-care-guide',
  },
  {
    id: 'b-2',
    title: 'Top 5 Fruit Trees Perfect for Rooftop Garden Containers',
    excerpt: 'Discover dwarf and grafted varieties of Guava, Malta, Lemon, and Katimon Mango that yield bumper fruit crops in 18-inch pots.',
    category: 'Rooftop Gardening',
    date: 'July 10, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    slug: 'top-rooftop-fruit-trees',
  },
  {
    id: 'b-3',
    title: 'Why Grafted Trees Fruit 3x Faster Than Seed-Grown Plants',
    excerpt: 'Understanding the biology of mature scion wood and rootstock vigor for guaranteed early harvesting and true-to-type fruit sweetness.',
    category: 'Nursery Science',
    date: 'June 28, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1595231712325-2fecd1f532a3?auto=format&fit=crop&w=600&q=80',
    slug: 'why-grafted-trees-fruit-faster',
  },
];
