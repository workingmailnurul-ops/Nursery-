export interface BlogPostDetail {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  content: string[];
  tags: string[];
}

export const EXTENDED_BLOG_POSTS: BlogPostDetail[] = [
  {
    id: 'b-1',
    title: 'How to Care for Newly Arrived Grafted Saplings',
    slug: 'grafted-sapling-care-guide',
    excerpt: 'Step-by-step guide on acclimatizing rootstock after transit, soil preparation with organic compost, and graft union protection.',
    category: 'Plant Care',
    date: 'July 18, 2026',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Dr. Anita Roy',
      role: 'Chief Agronomist & Horticulture Lead',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    tags: ['Grafted Plants', 'Acclimatization', 'Soil Mix', 'Fertilizer'],
    content: [
      'Unboxing live plants after a 3-5 day journey in courier crates requires gentle care and patience. Your newly arrived grafted sapling has been kept in darkness during transit and needs step-by-step acclimatization before direct sunlight exposure.',
      '### Step 1: Immediate Unboxing & Deep Hydration',
      'Carefully remove the protective corrugated casing and plastic wrapping around the root ball. Do NOT disturb the soil block or peel off the plastic tape around the graft union joint. Place the potted plant in a shaded, well-ventilated spot (such as a covered balcony or veranda) and water gently until water drains from the bottom hole.',
      '### Step 2: The 3-5 Day Rest Period',
      'Keep the plant in bright indirect light for 3 to 5 days. Avoid placing it under harsh direct afternoon sun immediately. This resting phase allows the plant to rebuild transpiration pressure and recover from transit shock.',
      '### Step 3: Preparing the Perfect Potting Soil',
      'For potted fruit plants, prepare a light, well-draining potting mixture:',
      '• 40% Clean Garden Soil / Red Soil\n• 30% Well-Rotted Vermicompost or Cow Manure\n• 20% Coco Peat / Rice Husk for aeration\n• 10% Neem Cake Powder (protects against root rot & nematodes)',
      '### Step 4: Protecting the Graft Joint',
      'When repotting into a larger 12 to 18-inch pot, ensure the graft union (the noticeable bump or V-shaped joint near the base) remains at least 2 inches above the soil line. If buried underground, rootstock suckers will overpower the grafted fruiting scion.',
      'Water thoroughly after repotting and enjoy watching your grafted tree flush with fresh pinkish-green leaves within 2-3 weeks!'
    ]
  },
  {
    id: 'b-2',
    title: 'Top 5 Fruit Trees Perfect for Rooftop Garden Containers',
    slug: 'top-rooftop-fruit-trees',
    excerpt: 'Discover dwarf and grafted varieties of Guava, Malta, Lemon, and Katimon Mango that yield bumper fruit crops in 18-inch pots.',
    category: 'Rooftop Gardening',
    date: 'July 10, 2026',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Vikramaditya Sharma',
      role: 'Urban Gardening Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    tags: ['Rooftop Garden', 'Container Fruits', 'Dwarf Varieties', 'Urban Farming'],
    content: [
      'Having limited ground space doesn\'t mean you can\'t harvest fresh, chemical-free organic fruits at home! Thanks to modern grafting techniques on dwarfing rootstocks, urban garden lovers can grow heavy-yielding fruit trees right on their terraces and balconies.',
      '### 1. Thai 7 & L-49 Guava (Lucknow 49)',
      'Guava is the king of rooftop container farming. Both L-49 and Thai 7 varieties start flowering within 6 months of repotting into a 16-inch container. They love full sun (6+ hours daily) and produce crisp, sweet guavas twice a year.',
      '### 2. All-Time Katimon Mango',
      'Unlike seasonal mangoes that yield only in May-June, the Katimon Mango variety flowers and bears sweet mangoes 3 times a year. Its compact branching habit makes it effortless to prune and manage in 18-inch pots.',
      '### 3. BARI 1 Seedless Malta & Sweet Lemon',
      'Citrus plants thrive exceptionally well in pots. The BARI 1 Malta produces juicy, thin-skinned yellow fruits bursting with Vitamin C. A single mature potted citrus plant can produce up to 30-40 fruits per season.',
      '### 4. Thai Red Diamond Guava',
      'Known for its ruby-red interior flesh and high antioxidant count, this exotic dwarf guava is both an ornamental showstopper and a delicious fruiting plant for sunlit balconies.',
      '### 5. Grafted Pomegranate (Bhagwa Variety)',
      'Bhagwa Pomegranates feature deep red seeds and high juice content. They require minimal water once established and thrive in warm rooftop climates with regular vermicompost feeding.'
    ]
  },
  {
    id: 'b-3',
    title: 'Why Grafted Trees Fruit 3x Faster Than Seed-Grown Plants',
    slug: 'why-grafted-trees-fruit-faster',
    excerpt: 'Understanding the biology of mature scion wood and rootstock vigor for guaranteed early harvesting and true-to-type fruit sweetness.',
    category: 'Nursery Science',
    date: 'June 28, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1595231712325-2fecd1f532a3?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Dr. Anita Roy',
      role: 'Chief Agronomist & Horticulture Lead',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    },
    tags: ['Grafting Science', 'Scion Wood', 'Early Fruiting', 'Horticulture'],
    content: [
      'One of the most common questions from beginner gardeners is: "Why shouldn\'t I just plant a seed from a sweet mango or apple I ate?" While growing from seed is fun, it comes with two major drawbacks: unpredictable fruit quality and an extremely long waiting period of 8-12 years!',
      '### The Science of Scion Maturity',
      'Grafting bridges a twig (scion) taken from a mature, proven, high-yielding mother tree onto a hardy seedling rootstock. Because the scion wood retains the physiological maturity of the mother tree, it "remembers" its fruiting age.',
      'Instead of taking 8 years to reach adult flowering phase, a grafted sapling begins producing flower panicles within 12 to 18 months!',
      '### Genetic Purity & True-to-Type Sweetness',
      'Seeds undergo genetic recombination during pollination. A seed from a delicious Alphonso mango might turn out sour, fibrous, or small. Grafting guarantees 100% exact genetic clones of superior mother varieties.',
      '### Disease Resistance via Native Rootstock',
      'Rootstocks selected for grafting possess natural resistance against soil-borne fungi, nematodes, and drought stress. Combined with top-quality fruiting scions, grafted trees offer the best of both worlds: vigor below ground and sweet yield above ground.'
    ]
  },
  {
    id: 'b-4',
    title: 'Seasonal Organic Fertilizer Calendar for Fruit Trees',
    slug: 'organic-fertilizer-calendar-fruit-trees',
    excerpt: 'When and how to feed your potted and garden fruit trees with mustard cake, bone meal, seaweed extract, and vermicompost.',
    category: 'Plant Care',
    date: 'June 15, 2026',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Vikramaditya Sharma',
      role: 'Urban Gardening Specialist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    },
    tags: ['Organic Fertilizer', 'Mustard Cake', 'Seasonal Care', 'Soil Health'],
    content: [
      'Feeding your fruit plants with the right nutrients at the right stage of their growth cycle makes all the difference between a sparse harvest and branch-bending yields of sweet fruit.',
      '### Pre-Monsoon Feeding (June - July)',
      'Apply a heavy dosage of organic compost (2-3 kg per pot or garden tree) along with 100g Neem cake powder and 50g Bone meal / Rock phosphate. Rainwater carries natural atmospheric nitrogen that triggers vigorous new branch flushes.',
      '### Post-Monsoon Preparation (October - November)',
      'As monsoon rains taper off, loosen the top 2 inches of soil carefully (ring digging method) and feed with aged cow dung manure mixed with micronutrient seaweed granules. This prepares the tree for winter flower bud differentiation.',
      '### Flowering & Fruit Setting Stage (February - March)',
      'During flower panicle development, avoid heavy nitrogen fertilizers which cause flower drop. Spray liquid seaweed extract or fermented Mustard Cake liquid tea diluted 1:10 with water once every 14 days to boost fruit retention!'
    ]
  }
];
