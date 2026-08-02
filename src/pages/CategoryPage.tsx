import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Sprout,
  ChevronRight,
  Filter,
  SlidersHorizontal,
  X,
  RotateCcw,
  ShieldCheck,
  Building2,
  User,
  ShoppingBag,
  ArrowRight,
  Check,
  Clock,
  Heart,
  Eye,
  Tag,
  Boxes,
} from 'lucide-react';
import { useFirestore } from '../context/FirestoreContext';
import { useCart } from '../context/CartContext';
import { Product, BulkTier } from '../types';
import { Button } from '../components/Button';
import { PriceTag } from '../components/PriceTag';
import { RatingStars } from '../components/RatingStars';
import { QuickViewModal } from '../components/QuickViewModal';
import { ProductCard } from '../components/ProductCard';

export const CategoryPage: React.FC = () => {
  const { slug = 'mango' } = useParams<{ slug: string }>();
  const { products, categories, isLoading } = useFirestore();
  const { addToCart } = useCart();

  // Mode toggle: Retail vs Bulk/Wholesale
  const [saleMode, setSaleMode] = useState<'retail' | 'bulk'>('retail');

  // Filters State
  const [maxPrice, setMaxPrice] = useState<number>(2000);
  const [selectedHeight, setSelectedHeight] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popularity');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Quick View Modal Product
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Pagination State
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Find category info from Firestore categories or fallback
  const categoryInfo = useMemo(() => {
    const found = categories.find(
      (c) => c.slug.toLowerCase() === slug.toLowerCase() || c.id.toLowerCase() === slug.toLowerCase()
    );
    if (found) return found;

    const formattedName = slug
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      id: `cat-${slug}`,
      name: formattedName,
      slug: slug,
      itemCount: 12,
      image: 'https://images.unsplash.com/photo-1595231712325-2fecd1f532a3?auto=format&fit=crop&w=800&q=80',
      popularVariety: 'Certified Grafted Nursery Collection',
      description: `Premium grafted ${formattedName} saplings certified for early fruiting and rooftop pot adaptation.`
    };
  }, [slug, categories]);

  // Combine products matching this category slug
  const categoryProducts = useMemo(() => {
    let matched = products.filter((p) => {
      if (slug === 'all') return true;
      const catLower = p.category.toLowerCase();
      const slugLower = slug.toLowerCase();

      if (catLower === slugLower) return true;
      if (p.slug && p.slug.toLowerCase() === slugLower) return true;
      
      // Category group matches
      if (slugLower === 'indoor-plants' && (catLower.includes('indoor') || catLower.includes('plant'))) return true;
      if (slugLower === 'fruit-plants' && (catLower !== 'seeds' && catLower !== 'accessories')) return true;
      if (slugLower === 'seeds' && (catLower.includes('seed') || catLower.includes('care'))) return true;
      if (slugLower === 'mango' && catLower.includes('mango')) return true;
      if (slugLower === 'guava' && catLower.includes('guava')) return true;
      if (slugLower === 'citrus' && (catLower.includes('citrus') || catLower.includes('lemon'))) return true;
      if (slugLower === 'exotic' && (catLower.includes('exotic') || catLower.includes('dwarf'))) return true;

      return false;
    });

    // If no direct matches, show all products so category page isn't blank
    if (matched.length === 0) {
      matched = products;
    }

    // Apply Price Filter & Search
    let list = matched.filter((p) => {
      const matchesPrice = p.price <= maxPrice;
      const matchesQuery =
        !searchTerm ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesPrice && matchesQuery;
    });

    // Apply Sorting
    if (sortBy === 'price-low') {
      list = list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list = list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list = list.sort((a, b) => b.rating - a.rating);
    } else {
      list = list.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return list;
  }, [slug, products, maxPrice, searchTerm, sortBy]);

  const totalPages = Math.ceil(categoryProducts.length / itemsPerPage);
  const paginatedProducts = categoryProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16">
      {/* BREADCRUMB */}
      <div className="bg-white border-b border-stone-200 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-stone-500">
          <Link to="/" className="hover:text-[#2A8A3C]">Home</Link>
          <ChevronRight size={12} />
          <Link to="/categories" className="hover:text-[#2A8A3C]">Categories</Link>
          <ChevronRight size={12} />
          <span className="text-stone-800 font-bold capitalize">{categoryInfo.name}</span>
        </div>
      </div>

      {/* CATEGORY BANNER HERO */}
      <section className="bg-[#1E3A20] text-white py-10 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <span className="inline-flex items-center gap-1 bg-[#E8862E] text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              <Sprout size={12} /> Nursery Category Page
            </span>
            <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-amber-50">
              {categoryInfo.name} Saplings
            </h1>
            <p className="text-stone-200 text-xs sm:text-sm leading-relaxed">
              {categoryInfo.description || `Browse certified ${categoryInfo.name} plants ready for immediate courier dispatch.`}
            </p>
            {categoryInfo.popularVariety && (
              <p className="text-xs text-amber-200 font-bold">
                Popular Varieties: {categoryInfo.popularVariety}
              </p>
            )}
          </div>

          <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden border-4 border-white/20 shadow-xl shrink-0">
            <img src={categoryInfo.image} alt={categoryInfo.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* FILTER BAR */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <input
              type="text"
              placeholder={`Search in ${categoryInfo.name}...`}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-1.5 text-xs font-medium text-stone-800 w-full sm:w-64"
            />
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-stone-500 font-medium">Max Price:</span>
              <span className="font-mono font-bold text-[#2F5233]">₹{maxPrice}</span>
              <input
                type="range"
                min="300"
                max="3000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-[#2F5233] cursor-pointer"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#FAF7F2] border border-stone-200 rounded-xl px-2.5 py-1.5 font-bold text-stone-700 text-xs cursor-pointer"
            >
              <option value="popularity">Popularity</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-3xl border border-stone-200 text-stone-500 space-y-2">
            <p className="font-bold text-base">No products match your filters for this category.</p>
            <button
              onClick={() => {
                setMaxPrice(3000);
                setSearchTerm('');
              }}
              className="text-xs font-bold text-[#E8862E] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-50 disabled:opacity-40 cursor-pointer"
            >
              Previous
            </button>
            <span className="text-xs font-bold text-stone-600 px-2">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-50 disabled:opacity-40 cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
};
