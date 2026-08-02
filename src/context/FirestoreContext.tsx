import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  writeBatch
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product, CategoryItem, BlogPostItem, ArticleItem, CouponItem, OfferItem } from '../types';
import { PRODUCTS, FRUIT_CATEGORIES } from '../data/products';
import { EXTENDED_BLOG_POSTS } from '../data/blogData';
import { INITIAL_COUPONS } from '../pages/admin/adminData';
import { compressImageIfNeeded } from '../utils/imageCompressor';

interface FirestoreContextType {
  products: Product[];
  categories: CategoryItem[];
  blogs: BlogPostItem[];
  articles: ArticleItem[];
  coupons: CouponItem[];
  offers: OfferItem[];
  isLoading: boolean;
  error: string | null;

  // Product CRUD
  addProduct: (product: Omit<Product, 'id'> & { id?: string }) => Promise<void>;
  updateProduct: (id: string, updates: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;

  // Category CRUD
  addCategory: (category: Omit<CategoryItem, 'id'> & { id?: string }) => Promise<void>;
  updateCategory: (id: string, updates: Partial<CategoryItem>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;

  // Blog CRUD
  addBlog: (blog: Omit<BlogPostItem, 'id'> & { id?: string }) => Promise<void>;
  updateBlog: (id: string, updates: Partial<BlogPostItem>) => Promise<void>;
  deleteBlog: (id: string) => Promise<void>;

  // Article CRUD
  addArticle: (article: Omit<ArticleItem, 'id'> & { id?: string }) => Promise<void>;
  updateArticle: (id: string, updates: Partial<ArticleItem>) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;

  // Coupon CRUD
  addCoupon: (coupon: Omit<CouponItem, 'id'> & { id?: string }) => Promise<void>;
  updateCoupon: (id: string, updates: Partial<CouponItem>) => Promise<void>;
  deleteCoupon: (id: string) => Promise<void>;

  // Computed views
  trendingProducts: Product[];
  featuredProducts: Product[];
  bestSellers: Product[];
  latestProducts: Product[];
}

const FirestoreContext = createContext<FirestoreContextType | undefined>(undefined);

// Helper to create URL-safe slugs
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export const FirestoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [blogs, setBlogs] = useState<BlogPostItem[]>([]);
  const [articles, setArticles] = useState<ArticleItem[]>([]);
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const [offers, setOffers] = useState<OfferItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Set up real-time snapshot listeners for all Firestore collections
  useEffect(() => {
    let unsubProducts: () => void;
    let unsubCategories: () => void;
    let unsubBlogs: () => void;
    let unsubArticles: () => void;
    let unsubCoupons: () => void;
    let unsubOffers: () => void;

    const setupListeners = async () => {
      try {
        setIsLoading(true);

        // 1. Products Listener
        const productsCol = collection(db, 'products');
        unsubProducts = onSnapshot(productsCol, async (snapshot) => {
          if (snapshot.empty) {
            console.log('[Firestore] Products empty, seeding default catalog...');
            await seedProducts();
          } else {
            const list: Product[] = [];
            snapshot.forEach((docSnap) => {
              const data = docSnap.data();
              list.push({
                ...data,
                id: docSnap.id,
                slug: data.slug || slugify(data.name || docSnap.id),
                isTrending: data.isTrending ?? (data.rating >= 4.8 || (data.badgeText && data.badgeText.toLowerCase().includes('trending'))),
                isFeatured: data.isFeatured ?? (data.rating >= 4.7 || (data.badgeText && data.badgeText.toLowerCase().includes('featured'))),
                isBestSeller: data.isBestSeller ?? (data.reviewCount > 50 || (data.badgeText && data.badgeText.toLowerCase().includes('bestseller'))),
              } as Product);
            });
            setProducts(list);
          }
          setIsLoading(false);
        }, (err) => {
          console.error('Products listener error:', err);
          setError(err.message);
          setIsLoading(false);
        });

        // 2. Categories Listener
        const categoriesCol = collection(db, 'categories');
        unsubCategories = onSnapshot(categoriesCol, async (snapshot) => {
          if (snapshot.empty) {
            console.log('[Firestore] Categories empty, seeding default categories...');
            await seedCategories();
          } else {
            const list: CategoryItem[] = [];
            snapshot.forEach((docSnap) => {
              const data = docSnap.data();
              list.push({
                ...data,
                id: docSnap.id,
                slug: data.slug || slugify(data.name || docSnap.id)
              } as CategoryItem);
            });
            setCategories(list);
          }
        }, (err) => {
          console.error('Categories listener error:', err);
        });

        // 3. Blogs Listener
        const blogsCol = collection(db, 'blogs');
        unsubBlogs = onSnapshot(blogsCol, async (snapshot) => {
          if (snapshot.empty) {
            console.log('[Firestore] Blogs empty, seeding default blogs...');
            await seedBlogs();
          } else {
            const list: BlogPostItem[] = [];
            snapshot.forEach((docSnap) => {
              const data = docSnap.data();
              list.push({
                ...data,
                id: docSnap.id,
                slug: data.slug || slugify(data.title || docSnap.id)
              } as BlogPostItem);
            });
            setBlogs(list);
          }
        }, (err) => {
          console.error('Blogs listener error:', err);
        });

        // 4. Articles Listener
        const articlesCol = collection(db, 'articles');
        unsubArticles = onSnapshot(articlesCol, async (snapshot) => {
          setError(null);
          if (snapshot.empty) {
            console.log('[Firestore] Articles empty, seeding default articles...');
            await seedArticles();
          } else {
            const list: ArticleItem[] = [];
            snapshot.forEach((docSnap) => {
              const data = docSnap.data();
              list.push({
                ...data,
                id: docSnap.id,
                slug: data.slug || slugify(data.title || docSnap.id)
              } as ArticleItem);
            });
            setArticles(list);
          }
        }, (err) => {
          console.error('Articles listener error:', err);
          setError(err.message);
        });

        // 5. Coupons Listener
        const couponsCol = collection(db, 'coupons');
        unsubCoupons = onSnapshot(couponsCol, async (snapshot) => {
          if (snapshot.empty) {
            console.log('[Firestore] Coupons empty, seeding default coupons...');
            await seedCoupons();
          } else {
            const list: CouponItem[] = [];
            snapshot.forEach((docSnap) => {
              const data = docSnap.data();
              list.push({
                ...data,
                id: docSnap.id
              } as CouponItem);
            });
            setCoupons(list);
          }
        }, (err) => {
          console.error('Coupons listener error:', err);
        });

        // 6. Offers Listener
        const offersCol = collection(db, 'offers');
        unsubOffers = onSnapshot(offersCol, async (snapshot) => {
          if (snapshot.empty) {
            console.log('[Firestore] Offers empty, seeding default offers...');
            await seedOffers();
          } else {
            const list: OfferItem[] = [];
            snapshot.forEach((docSnap) => {
              const data = docSnap.data();
              list.push({
                ...data,
                id: docSnap.id
              } as OfferItem);
            });
            setOffers(list);
          }
        }, (err) => {
          console.error('Offers listener error:', err);
        });

      } catch (err: any) {
        console.error('Error setting up Firestore listeners:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setupListeners();

    return () => {
      if (unsubProducts) unsubProducts();
      if (unsubCategories) unsubCategories();
      if (unsubBlogs) unsubBlogs();
      if (unsubArticles) unsubArticles();
      if (unsubCoupons) unsubCoupons();
      if (unsubOffers) unsubOffers();
    };
  }, []);

  // SEEDING HELPERS
  const seedProducts = async () => {
    try {
      const batch = writeBatch(db);
      PRODUCTS.forEach((prod, idx) => {
        const prodRef = doc(db, 'products', prod.id);
        const slug = slugify(prod.name);
        batch.set(prodRef, {
          ...prod,
          slug,
          isTrending: idx % 2 === 0 || prod.rating >= 4.8,
          isFeatured: idx % 3 === 0 || prod.rating >= 4.7,
          isBestSeller: idx < 6 || prod.reviewCount > 50,
          createdAt: new Date(Date.now() - idx * 86400000).toISOString()
        });
      });
      await batch.commit();
      console.log('[Firestore] Seeded PRODUCTS successfully');
    } catch (e) {
      console.error('Error seeding products:', e);
    }
  };

  const seedCategories = async () => {
    try {
      const batch = writeBatch(db);
      // Map fruit categories + custom categories required (indoor-plants, fruit-plants, seeds, etc.)
      const defaultCats: CategoryItem[] = [
        {
          id: 'cat-indoor-plants',
          name: 'Indoor Plants',
          slug: 'indoor-plants',
          itemCount: 18,
          popularVariety: 'Money Plant, Snake Plant & Peace Lily',
          image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80',
          description: 'Low-maintenance, air-purifying indoor oxygen plants for homes and office spaces.',
          status: 'active'
        },
        {
          id: 'cat-fruit-plants',
          name: 'Fruit Plants',
          slug: 'fruit-plants',
          itemCount: 42,
          popularVariety: 'All-Time Mango, Thai Guava & Sweet Malta',
          image: 'https://images.unsplash.com/photo-1595231712325-2fecd1f532a3?auto=format&fit=crop&w=600&q=80',
          description: '100% genuine mother-plant grafted fruit saplings for home gardens and commercial orchards.',
          status: 'active'
        },
        {
          id: 'cat-seeds',
          name: 'Seeds & Organic Care',
          slug: 'seeds',
          itemCount: 25,
          popularVariety: 'Organic Vegetable Seeds & Neem Cake Powder',
          image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
          description: 'High-germination heirloom vegetable seeds and bio-fertilizer soil amendments.',
          status: 'active'
        },
        ...FRUIT_CATEGORIES.map((cat) => ({
          id: cat.id,
          name: cat.name,
          slug: cat.slug,
          itemCount: cat.itemCount,
          popularVariety: cat.popularVariety,
          image: cat.image,
          description: `${cat.name} grafted varieties certified for early fruit production.`,
          status: 'active' as const
        }))
      ];

      defaultCats.forEach((cat) => {
        const catRef = doc(db, 'categories', cat.id);
        batch.set(catRef, cat);
      });
      await batch.commit();
      console.log('[Firestore] Seeded CATEGORIES successfully');
    } catch (e) {
      console.error('Error seeding categories:', e);
    }
  };

  const seedBlogs = async () => {
    try {
      const batch = writeBatch(db);
      EXTENDED_BLOG_POSTS.forEach((post) => {
        const blogRef = doc(db, 'blogs', post.id);
        batch.set(blogRef, {
          ...post,
          status: 'published',
          views: Math.floor(Math.random() * 800) + 200
        });
      });
      await batch.commit();
      console.log('[Firestore] Seeded BLOGS successfully');
    } catch (e) {
      console.error('Error seeding blogs:', e);
    }
  };

  const seedCoupons = async () => {
    try {
      const batch = writeBatch(db);
      INITIAL_COUPONS.forEach((coupon) => {
        const couponRef = doc(db, 'coupons', coupon.id);
        batch.set(couponRef, coupon);
      });
      await batch.commit();
      console.log('[Firestore] Seeded COUPONS successfully');
    } catch (e) {
      console.error('Error seeding coupons:', e);
    }
  };

  const seedOffers = async () => {
    try {
      const defaultOffers: OfferItem[] = [
        {
          id: 'off-1',
          title: 'Monsoon Planting Special Offer',
          subtitle: 'Get flat 20% OFF on all Grafted Mango & Guava Combo Packs.',
          badge: 'Seasonal Super Deal',
          discountTag: '20% OFF',
          imageUrl: 'https://images.unsplash.com/photo-1595231712325-2fecd1f532a3?auto=format&fit=crop&w=800&q=80',
          code: 'MONSOON20',
          categorySlug: 'mango'
        },
        {
          id: 'off-2',
          title: 'Rooftop Balcony Garden Kit Discount',
          subtitle: 'Buy 3 Dwarf Grafted Fruit Plants and receive free Neem Fertilizer & Potting Gel.',
          badge: 'Limited Rooftop Deal',
          discountTag: '15% OFF',
          imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
          code: 'ROOFTOP15',
          categorySlug: 'fruit-plants'
        },
        {
          id: 'off-3',
          title: 'Free Courier Shipping Nationwide',
          subtitle: 'Free doorstep live plant delivery on all orders above ₹2,000.',
          badge: 'Free Shipping Voucher',
          discountTag: 'FREE DELIVERY',
          imageUrl: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
          code: 'FREESHIP',
          categorySlug: 'all'
        }
      ];

      const batch = writeBatch(db);
      defaultOffers.forEach((off) => {
        const offerRef = doc(db, 'offers', off.id);
        batch.set(offerRef, off);
      });
      await batch.commit();
      console.log('[Firestore] Seeded OFFERS successfully');
    } catch (e) {
      console.error('Error seeding offers:', e);
    }
  };

  const seedArticles = async () => {
    try {
      const defaultArticles: ArticleItem[] = [
        {
          id: 'art-1',
          title: 'Grafted Fruit Tree Care & Rootstock Protection Guide',
          slug: 'grafted-fruit-tree-care-guide',
          excerpt: 'Comprehensive agronomist guide to acclimatizing freshly delivered grafted saplings, potting mixes, and preventing graft joint breakage.',
          category: 'Graft Care',
          author: 'Dr. Anita Roy',
          date: 'July 24, 2026',
          readTime: '6 min read',
          image: 'https://images.unsplash.com/photo-1595231712325-2fecd1f532a3?auto=format&fit=crop&w=800&q=80',
          content: [
            'Grafted saplings combine the vigorous root system of a hardy rootstock with the superior fruiting qualities of a mother plant scion.',
            'When your sapling arrives via courier, keep it in partial shade for 3 to 4 days. Water gently until soil is damp but avoid waterlogging around the graft union.',
            'Do not remove the protective grafting polythene tape until 3 months after planting, or until you notice active new shoots emerging above the graft joint.'
          ],
          tags: ['Grafting', 'Fruit Trees', 'Sapling Care'],
          status: 'published',
          views: 420
        },
        {
          id: 'art-2',
          title: 'Top 10 Dwarf Fruit Plants Suitable for Rooftop Gardens',
          slug: 'top-dwarf-fruit-plants-rooftop-gardening',
          excerpt: 'Discover high-yield dwarf and hybrid fruit trees engineered for container planting on balconies and urban terraces.',
          category: 'Rooftop Gardening',
          author: 'Subhash Chandra (Nursery Specialist)',
          date: 'July 18, 2026',
          readTime: '8 min read',
          image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
          content: [
            'Rooftop gardening requires fruit varieties that remain compact while yielding abundant, high-quality fruit.',
            'Thai All-Time Mango, Sweet Malta, All-Season Guava, and Seedless Lime are prime candidates for 14-inch to 18-inch containers.',
            'Ensure proper drainage using a lightweight potting mix containing vermicompost, coco peat, and organic neem cake.'
          ],
          tags: ['Rooftop', 'Container Gardening', 'Urban Farming'],
          status: 'published',
          views: 650
        },
        {
          id: 'art-3',
          title: 'Organic Fertilizer Schedule for Fruit Saplings',
          slug: 'organic-fertilizer-schedule-fruit-trees',
          excerpt: 'Month-by-month organic feeding chart using mustard cake powder, bone meal, and bio-NPK for sweet fruits.',
          category: 'Organic Care',
          author: 'Agronomist Team',
          date: 'July 10, 2026',
          readTime: '5 min read',
          image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
          content: [
            'Organic fertilization encourages beneficial soil microflora and improves root nutrient absorption without chemical burn.',
            'Feed your young saplings mustard cake liquid fertilizer every 15 days during spring and monsoon growing seasons.',
            'Add bone meal and crushed eggshells prior to flowering to boost phosphorus and calcium levels essential for firm fruit setting.'
          ],
          tags: ['Organic', 'Fertilizers', 'Soil Health'],
          status: 'published',
          views: 310
        }
      ];

      const batch = writeBatch(db);
      defaultArticles.forEach((art) => {
        const artRef = doc(db, 'articles', art.id);
        batch.set(artRef, art);
      });
      await batch.commit();
      console.log('[Firestore] Seeded ARTICLES successfully');
    } catch (e) {
      console.error('Error seeding articles:', e);
    }
  };

  // PRODUCT CRUD OPERATIONS
  const addProduct = async (productData: Omit<Product, 'id'> & { id?: string }) => {
    const id = productData.id || `prod-${Date.now()}`;
    const slug = productData.slug || slugify(productData.name);
    const compressedImage = await compressImageIfNeeded(productData.image || '');

    const newDoc: Product = {
      ...productData,
      id,
      slug,
      image: compressedImage,
      rating: productData.rating || 5.0,
      reviewCount: productData.reviewCount || 1,
      inStock: productData.inStock ?? true,
      isTrending: productData.isTrending ?? true,
      isFeatured: productData.isFeatured ?? true,
      isBestSeller: productData.isBestSeller ?? false,
      createdAt: new Date().toISOString()
    };

    await setDoc(doc(db, 'products', id), newDoc);
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    if (updates.name && !updates.slug) {
      updates.slug = slugify(updates.name);
    }
    if (updates.image) {
      updates.image = await compressImageIfNeeded(updates.image);
    }
    const docRef = doc(db, 'products', id);
    await updateDoc(docRef, updates);
  };

  const deleteProduct = async (id: string) => {
    await deleteDoc(doc(db, 'products', id));
  };

  // CATEGORY CRUD OPERATIONS
  const addCategory = async (catData: Omit<CategoryItem, 'id'> & { id?: string }) => {
    const id = catData.id || `cat-${Date.now()}`;
    const slug = catData.slug || slugify(catData.name);
    const compressedImage = await compressImageIfNeeded(catData.image || '');

    const newDoc: CategoryItem = {
      ...catData,
      id,
      slug,
      image: compressedImage,
      status: catData.status || 'active',
      itemCount: catData.itemCount || 0,
      popularVariety: catData.popularVariety || 'Hybrid Selection'
    };

    await setDoc(doc(db, 'categories', id), newDoc);
  };

  const updateCategory = async (id: string, updates: Partial<CategoryItem>) => {
    if (updates.name && !updates.slug) {
      updates.slug = slugify(updates.name);
    }
    if (updates.image) {
      updates.image = await compressImageIfNeeded(updates.image);
    }
    await updateDoc(doc(db, 'categories', id), updates);
  };

  const deleteCategory = async (id: string) => {
    await deleteDoc(doc(db, 'categories', id));
  };

  // BLOG CRUD OPERATIONS
  const addBlog = async (blogData: Omit<BlogPostItem, 'id'> & { id?: string }) => {
    const id = blogData.id || `b-${Date.now()}`;
    const slug = blogData.slug || slugify(blogData.title);
    const compressedImage = await compressImageIfNeeded(blogData.image || '');

    const newDoc: BlogPostItem = {
      ...blogData,
      id,
      slug,
      image: compressedImage,
      date: blogData.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: blogData.readTime || '5 min read',
      status: blogData.status || 'published',
      views: 0
    };

    await setDoc(doc(db, 'blogs', id), newDoc);
  };

  const updateBlog = async (id: string, updates: Partial<BlogPostItem>) => {
    if (updates.title && !updates.slug) {
      updates.slug = slugify(updates.title);
    }
    if (updates.image) {
      updates.image = await compressImageIfNeeded(updates.image);
    }
    await updateDoc(doc(db, 'blogs', id), updates);
  };

  const deleteBlog = async (id: string) => {
    await deleteDoc(doc(db, 'blogs', id));
  };

  // ARTICLE CRUD OPERATIONS
  const addArticle = async (articleData: Omit<ArticleItem, 'id'> & { id?: string }) => {
    const id = articleData.id || `art-${Date.now()}`;
    const slug = articleData.slug || slugify(articleData.title);
    const compressedImage = await compressImageIfNeeded(articleData.image || '');

    const newDoc: ArticleItem = {
      ...articleData,
      id,
      slug,
      image: compressedImage,
      date: articleData.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: articleData.readTime || '5 min read',
      status: articleData.status || 'published',
      views: 0
    };

    await setDoc(doc(db, 'articles', id), newDoc);
  };

  const updateArticle = async (id: string, updates: Partial<ArticleItem>) => {
    if (updates.title && !updates.slug) {
      updates.slug = slugify(updates.title);
    }
    if (updates.image) {
      updates.image = await compressImageIfNeeded(updates.image);
    }
    await updateDoc(doc(db, 'articles', id), updates);
  };

  const deleteArticle = async (id: string) => {
    await deleteDoc(doc(db, 'articles', id));
  };

  // COUPON CRUD OPERATIONS
  const addCoupon = async (couponData: Omit<CouponItem, 'id'> & { id?: string }) => {
    const id = couponData.id || `c-${Date.now()}`;
    const newDoc: CouponItem = {
      ...couponData,
      id,
      code: couponData.code.toUpperCase().replace(/\s+/g, ''),
      isActive: couponData.isActive ?? true,
      usageCount: 0
    };

    await setDoc(doc(db, 'coupons', id), newDoc);
  };

  const updateCoupon = async (id: string, updates: Partial<CouponItem>) => {
    if (updates.code) {
      updates.code = updates.code.toUpperCase().replace(/\s+/g, '');
    }
    await updateDoc(doc(db, 'coupons', id), updates);
  };

  const deleteCoupon = async (id: string) => {
    await deleteDoc(doc(db, 'coupons', id));
  };

  // COMPUTED VIEWS
  const trendingProducts = products.filter((p) => p.isTrending || (p.badgeText && p.badgeText.toLowerCase().includes('trending')));
  const featuredProducts = products.filter((p) => p.isFeatured || (p.badgeText && p.badgeText.toLowerCase().includes('featured')));
  const bestSellers = products.filter((p) => p.isBestSeller || p.reviewCount > 40 || p.rating >= 4.8);
  const latestProducts = [...products].sort((a, b) => {
    const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <FirestoreContext.Provider
      value={{
        products,
        categories,
        blogs,
        articles,
        coupons,
        offers,
        isLoading,
        error,

        addProduct,
        updateProduct,
        deleteProduct,

        addCategory,
        updateCategory,
        deleteCategory,

        addBlog,
        updateBlog,
        deleteBlog,

        addArticle,
        updateArticle,
        deleteArticle,

        addCoupon,
        updateCoupon,
        deleteCoupon,

        trendingProducts,
        featuredProducts,
        bestSellers,
        latestProducts,
      }}
    >
      {children}
    </FirestoreContext.Provider>
  );
};

export const useFirestore = () => {
  const context = useContext(FirestoreContext);
  if (!context) {
    throw new Error('useFirestore must be used within a FirestoreProvider');
  }
  return context;
};
