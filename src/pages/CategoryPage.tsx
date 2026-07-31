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
import { PRODUCTS, COMBO_PACKS, FRUIT_CATEGORIES } from '../data/products';
import { useCart } from '../context/CartContext';
import { Product, BulkTier } from '../types';
import { Button } from '../components/Button';
import { PriceTag } from '../components/PriceTag';
import { RatingStars } from '../components/RatingStars';
import { QuickViewModal } from '../components/QuickViewModal';

export const CategoryPage: React.FC = () => {
  const { slug = 'mango' } = useParams<{ slug: string }>();
  const { addToCart } = useCart();

  // Mode toggle: Retail vs Bulk/Wholesale
  const [saleMode, setSaleMode] = useState<'retail' | 'bulk'>('retail');

  // Mobile Filter Drawer Toggle
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filters State
  const [maxPrice, setMaxPrice] = useState<number>(1500);
  const [selectedHeight, setSelectedHeight] = useState<string>('all');
  const [selectedPotSize, setSelectedPotSize] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('popularity');

  // Quick View Modal Product
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Pagination State
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 8;

  // Find category title & info from category list or fallback
  const categoryInfo = useMemo(() => {
    const found = FRUIT_CATEGORIES.find((c) => c.slug.toLowerCase() === slug.toLowerCase());
    if (found) return found;

    // Capitalize slug for display fallback
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
      popularVariety: 'Grafted Mother Scion Variety',
    };
  }, [slug]);

  // Combine products matching this category slug
  const categoryProducts = useMemo(() => {
    const all = [...PRODUCTS, ...COMBO_PACKS];

    // Filter products by category slug
    const matched = all.filter((p) => {
      if (slug === 'all') return true;
      if (p.category.toLowerCase() === slug.toLowerCase()) return true;
      if (slug === 'combo' && p.id.startsWith('combo')) return true;
      // Partial matching for synonyms
      if (slug === 'lemon' && p.category === 'citrus') return true;
      if (slug === 'citrus' && p.category === 'citrus') return true;
      return false;
    });

    // If no direct matches, return all products so page isn't broken for unmapped slugs
    return matched.length > 0 ? matched : PRODUCTS;
  }, [slug]);

  // Height Filter Options derived from category items
  const heightOptions = [
    { id: 'all', label: 'All Heights' },
    { id: '1.5-2', label: '1.5 - 2 Feet (Young Sapling)' },
    { id: '2-2.5', label: '2 - 2.5 Feet (Standard Scion)' },
    { id: '2.5-3', label: '2.5 - 3 Feet (Ready to Fruit)' },
    { id: '3-plus', label: '3+ Feet (Pre-Flowering Stage)' },
  ];

  // Pot Size / Soil Bag Options
  const potSizeOptions = [
    { id: 'all', label: 'All Packaging Types' },
    { id: 'polybag', label: '8-inch Polybag' },
    { id: 'soilbag', label: '10-inch Nursery Soil Bag' },
    { id: 'growbag', label: '12-inch Heavy Grow Bag' },
    { id: 'container', label: '18-inch Container Ready' },
  ];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = categoryProducts.filter((product) => {
      // Price Filter
      if (product.price > maxPrice) return false;

      // Height Filter
      if (selectedHeight !== 'all') {
        if (selectedHeight === '1.5-2' && !product.height.includes('1.5')) return false;
        if (selectedHeight === '2-2.5' && !product.height.includes('2')) return false;
        if (selectedHeight === '2.5-3' && !product.height.includes('2.5') && !product.height.includes('3')) return false;
        if (selectedHeight === '3-plus' && !product.height.includes('3')) return false;
      }

      // Pot Size Filter (Simulated mapping if product.potSize is absent)
      if (selectedPotSize !== 'all') {
        const itemPot = product.potSize || (product.price > 400 ? 'growbag' : 'polybag');
        if (selectedPotSize !== itemPot) return false;
      }

      return true;
    });

    // Sorting
    return [...result].sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.reviewCount - a.reviewCount;
      // Default: popularity
      return b.reviewCount - a.reviewCount;
    });
  }, [categoryProducts, maxPrice, selectedHeight, selectedPotSize, sortBy]);

  // Paginated View
  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(0, page * itemsPerPage);
  }, [filteredProducts, page]);

  const hasMore = paginatedProducts.length < filteredProducts.length;

  const handleResetFilters = () => {
    setMaxPrice(1500);
    setSelectedHeight('all');
    setSelectedPotSize('all');
    setSortBy('popularity');
    setPage(1);
  };

  // Helper to generate realistic bulk tier pricing
  const getBulkTiers = (product: Product): BulkTier[] => {
    if (product.bulkTiers && product.bulkTiers.length > 0) return product.bulkTiers;
    const base = product.price;
    return [
      { minQty: 1, maxQty: 9, pricePerUnit: base },
      { minQty: 10, maxQty: 49, pricePerUnit: Math.round(base * 0.8) },
      { minQty: 50, pricePerUnit: Math.round(base * 0.65) },
    ];
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* 1. BREADCRUMB NAVIGATION */}
      <nav aria-label="Breadcrumb" className="flex items-center text-xs text-stone-500 gap-1.5 flex-wrap">
        <Link to="/" className="hover:text-[#2F5233] font-medium transition-colors">
          Home
        </Link>
        <ChevronRight size={12} className="text-stone-400" />
        <Link to="/shop" className="hover:text-[#2F5233] font-medium transition-colors">
          Fruit Saplings
        </Link>
        <ChevronRight size={12} className="text-stone-400" />
        <span className="font-bold text-[#2F5233] capitalize">{categoryInfo.name}</span>
      </nav>

      {/* 2. CATEGORY HERO BANNER & SALE MODE TOGGLE */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F2] border border-stone-200 rounded-full text-xs text-[#E8862E] font-bold uppercase tracking-wider">
              <Sprout size={14} /> Certified Mother-Scion Collection
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#2F5233]">
              {categoryInfo.name} Grafted Saplings
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              Explore high-yield {categoryInfo.name.toLowerCase()} saplings carefully grafted with disease-resistant scions. Guaranteed true-to-type taste and early fruiting within 12-18 months.
            </p>
          </div>

          {/* RETAIL vs BULK / WHOLESALE TOGGLE */}
          <div className="bg-[#FAF7F2] p-2 rounded-2xl border border-stone-200 shrink-0 self-start lg:self-center">
            <span className="text-[10px] font-extrabold uppercase text-stone-400 block mb-1 px-1 tracking-wider">
              Select Pricing Mode:
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSaleMode('retail')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  saleMode === 'retail'
                    ? 'bg-[#2F5233] text-white shadow-md'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                }`}
              >
                <User size={15} /> Retail (Home Garden)
              </button>
              <button
                onClick={() => setSaleMode('bulk')}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  saleMode === 'bulk'
                    ? 'bg-[#E8862E] text-white shadow-md'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200'
                }`}
              >
                <Building2 size={15} /> Bulk / Wholesale (Up to 35% OFF)
              </button>
            </div>
          </div>
        </div>

        {/* Wholesale Banner Indicator when Bulk Mode is Active */}
        {saleMode === 'bulk' && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <Boxes size={20} className="text-[#E8862E] shrink-0" />
              <div>
                <span className="font-bold text-amber-950 block">
                  Wholesale Tier Pricing Active
                </span>
                <p className="text-[11px] text-amber-800">
                  Prices shown per unit dynamically adjust based on quantity tiers (1-9 pcs, 10-49 pcs, 50+ pcs).
                </p>
              </div>
            </div>
            <Link to="/contact">
              <Button variant="accent" size="sm">
                Request Custom Quotation
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* 3. MAIN SECTION WITH LEFT SIDEBAR FILTERS & PRODUCT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* MOBILE FILTER TRIGGER BUTTON */}
        <div className="lg:hidden flex items-center justify-between bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="flex items-center gap-2 text-xs font-bold text-[#2F5233] bg-[#FAF7F2] px-3.5 py-2 rounded-xl border border-stone-300"
          >
            <SlidersHorizontal size={15} /> Filters & Refinements
          </button>
          <span className="text-xs text-stone-500 font-medium">
            {filteredProducts.length} Products
          </span>
        </div>

        {/* DESKTOP LEFT SIDEBAR FILTERS */}
        <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24 bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 className="font-serif font-bold text-lg text-[#2F5233] flex items-center gap-2">
              <Filter size={18} className="text-[#E8862E]" /> Filter Saplings
            </h2>
            <button
              onClick={handleResetFilters}
              className="text-[11px] text-stone-400 hover:text-[#E8862E] flex items-center gap-1 font-bold transition-colors"
            >
              <RotateCcw size={12} /> Reset
            </button>
          </div>

          {/* PRICE RANGE FILTER */}
          <div className="space-y-2.5">
            <label className="text-xs font-bold text-stone-700 flex justify-between">
              <span>Max Price:</span>
              <span className="text-[#2F5233] font-extrabold">₹{maxPrice}</span>
            </label>
            <input
              type="range"
              min="150"
              max="1500"
              step="50"
              value={maxPrice}
              onChange={(e) => {
                setMaxPrice(Number(e.target.value));
                setPage(1);
              }}
              className="w-full accent-[#2F5233] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 font-bold">
              <span>₹150</span>
              <span>₹750</span>
              <span>₹1,500</span>
            </div>
          </div>

          {/* PLANT HEIGHT / AGE FILTER */}
          <div className="space-y-2 border-t border-stone-100 pt-4">
            <label className="text-xs font-bold text-stone-700 block">Plant Height / Age</label>
            <div className="space-y-1.5">
              {heightOptions.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-2 text-xs p-2 rounded-xl cursor-pointer transition ${
                    selectedHeight === opt.id
                      ? 'bg-[#FAF7F2] font-bold text-[#2F5233] border border-stone-300'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="plantHeight"
                    checked={selectedHeight === opt.id}
                    onChange={() => {
                      setSelectedHeight(opt.id);
                      setPage(1);
                    }}
                    className="accent-[#2F5233]"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* POT SIZE / CONTAINER PACKAGING FILTER */}
          <div className="space-y-2 border-t border-stone-100 pt-4">
            <label className="text-xs font-bold text-stone-700 block">Pot / Bag Packaging Size</label>
            <div className="space-y-1.5">
              {potSizeOptions.map((opt) => (
                <label
                  key={opt.id}
                  className={`flex items-center gap-2 text-xs p-2 rounded-xl cursor-pointer transition ${
                    selectedPotSize === opt.id
                      ? 'bg-[#FAF7F2] font-bold text-[#2F5233] border border-stone-300'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="potSize"
                    checked={selectedPotSize === opt.id}
                    onChange={() => {
                      setSelectedPotSize(opt.id);
                      setPage(1);
                    }}
                    className="accent-[#2F5233]"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* GUARANTEE BADGE SIDEBAR FOOTER */}
          <div className="bg-[#FAF7F2] p-3.5 rounded-2xl border border-stone-200 text-stone-600 text-[11px] space-y-1.5">
            <span className="font-bold text-[#2F5233] flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-600" /> Live Arrival Guarantee
            </span>
            <p className="text-[10px] text-stone-500 leading-normal">
              All grafted saplings are shipped in moist root bags inside reinforced courier boxes.
            </p>
          </div>
        </aside>

        {/* MOBILE FILTER DRAWER (BOTTOM SHEET / MODAL) */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex justify-end">
            <div className="bg-white w-full max-w-md h-full overflow-y-auto p-6 space-y-6 shadow-2xl flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <h3 className="font-serif font-bold text-lg text-[#2F5233] flex items-center gap-2">
                    <Filter size={18} className="text-[#E8862E]" /> Filter Saplings
                  </h3>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 text-stone-400 hover:text-stone-700"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Price Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-700 flex justify-between">
                    <span>Max Price:</span>
                    <span className="text-[#2F5233] font-bold">₹{maxPrice}</span>
                  </label>
                  <input
                    type="range"
                    min="150"
                    max="1500"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#2F5233]"
                  />
                </div>

                {/* Height Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-700 block">Plant Height / Age</label>
                  <div className="space-y-1">
                    {heightOptions.map((opt) => (
                      <label key={opt.id} className="flex items-center gap-2 text-xs py-1.5">
                        <input
                          type="radio"
                          name="mobileHeight"
                          checked={selectedHeight === opt.id}
                          onChange={() => setSelectedHeight(opt.id)}
                          className="accent-[#2F5233]"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Pot Size Filter */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-700 block">Packaging / Pot Size</label>
                  <div className="space-y-1">
                    {potSizeOptions.map((opt) => (
                      <label key={opt.id} className="flex items-center gap-2 text-xs py-1.5">
                        <input
                          type="radio"
                          name="mobilePot"
                          checked={selectedPotSize === opt.id}
                          onChange={() => setSelectedPotSize(opt.id)}
                          className="accent-[#2F5233]"
                        />
                        <span>{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t flex gap-3">
                <Button variant="outline" size="md" fullWidth onClick={handleResetFilters}>
                  Reset All
                </Button>
                <Button variant="primary" size="md" fullWidth onClick={() => setMobileFilterOpen(false)}>
                  Apply ({filteredProducts.length})
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 4. PRODUCT GRID AREA */}
        <main className="lg:col-span-9 space-y-6">
          {/* SORTING BAR & RESULTS COUNT */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <span className="text-stone-600 font-medium">
              Showing <strong className="text-[#2F5233]">{paginatedProducts.length}</strong> of{' '}
              <strong className="text-[#2F5233]">{filteredProducts.length}</strong> available saplings
            </span>

            <div className="flex items-center gap-2">
              <label htmlFor="sort-by-select" className="text-stone-500 font-bold shrink-0">Sort By:</label>
              <select
                id="sort-by-select"
                aria-label="Sort products by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-1.5 text-xs text-stone-800 font-bold focus:ring-2 focus:ring-[#2F5233]"
              >
                <option value="popularity">Popularity & Bestsellers</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
                <option value="newest">Newest Scion Graft Batches</option>
              </select>
            </div>
          </div>

          {/* PRODUCTS GRID OR EMPTY STATE */}
          {paginatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {paginatedProducts.map((product) => {
                const bulkTiers = getBulkTiers(product);

                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl border border-stone-200 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                  >
                    {/* Image & Badges */}
                    <div className="relative h-48 bg-[#FAF7F2] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80';
                        }}
                      />

                      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
                        {saleMode === 'bulk' ? (
                          <span className="bg-[#E8862E] text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                            <Tag size={10} /> Wholesale Tier
                          </span>
                        ) : (
                          product.badgeText && (
                            <span className="bg-rose-600 text-white font-bold text-[10px] px-2 py-0.5 rounded-md">
                              {product.badgeText}
                            </span>
                          )
                        )}
                      </div>

                      {/* Quick View */}
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="absolute top-2.5 right-2.5 p-2 rounded-full bg-white/80 backdrop-blur-md text-stone-600 hover:bg-white hover:text-[#2F5233] shadow-md transition-all opacity-0 group-hover:opacity-100"
                        title="Quick View Details"
                      >
                        <Eye size={15} />
                      </button>

                      {/* Fruiting Time Strip */}
                      <div className="absolute bottom-2 left-2 right-2 bg-black/65 backdrop-blur-xs text-white text-[10px] py-0.5 px-2 rounded-md flex justify-between font-medium">
                        <span className="flex items-center gap-1">
                          <Clock size={11} className="text-[#E8862E]" /> Fruits in:
                        </span>
                        <span className="font-bold text-amber-300">{product.fruitingTime}</span>
                      </div>
                    </div>

                    {/* Product Details Body */}
                    <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] text-stone-400">
                          <span className="text-[#E8862E] font-bold uppercase tracking-wider text-[10px]">
                            {product.category}
                          </span>
                          <span>🌱 {product.graftType.split(' ')[0]}</span>
                        </div>

                        <h3 className="font-serif font-bold text-sm text-[#2F5233] group-hover:text-[#E8862E] transition-colors line-clamp-2 leading-snug">
                          {product.name}
                        </h3>

                        <RatingStars rating={product.rating} count={product.reviewCount} size={12} />
                      </div>

                      {/* PRICING DISPLAY DEPENDING ON SALE MODE */}
                      {saleMode === 'bulk' ? (
                        <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-stone-200 text-xs space-y-1.5">
                          <span className="text-[10px] font-bold text-[#E8862E] uppercase block tracking-wider">
                            Volume Tier Pricing:
                          </span>
                          <div className="space-y-1 text-[11px]">
                            {bulkTiers.map((tier, idx) => (
                              <div
                                key={idx}
                                className="flex justify-between items-center text-stone-700 font-medium border-b border-stone-200/60 pb-0.5 last:border-0"
                              >
                                <span>
                                  {tier.minQty}-{tier.maxQty ? tier.maxQty : '50+'} pcs:
                                </span>
                                <span className="font-bold text-[#2F5233]">
                                  ₹{tier.pricePerUnit}/unit
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="pt-2 border-t border-stone-100 flex items-baseline justify-between">
                          <PriceTag price={product.price} originalPrice={product.originalPrice} size="sm" />
                          <span className="text-[10px] text-stone-400 font-semibold">
                            Height: {product.height}
                          </span>
                        </div>
                      )}

                      {/* ADD TO CART / BULK ENQUIRY BUTTON */}
                      <Button
                        variant={saleMode === 'bulk' ? 'accent' : 'primary'}
                        size="sm"
                        fullWidth
                        onClick={() => addToCart(product, saleMode === 'bulk' ? 10 : 1)}
                        leftIcon={<ShoppingBag size={14} />}
                      >
                        {saleMode === 'bulk' ? 'Order Bulk Tier (Min 10 pcs)' : 'Add Sapling to Cart'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* 5. EMPTY STATE DESIGN */
            <div className="bg-white p-12 rounded-3xl border border-stone-200 text-center space-y-4 shadow-2xs max-w-lg mx-auto my-8">
              <div className="w-16 h-16 bg-[#FAF7F2] text-[#E8862E] rounded-full flex items-center justify-center mx-auto border border-stone-200">
                <Sprout size={32} />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#2F5233]">
                No Saplings Found Matching Your Filters
              </h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                We couldn't find any {categoryInfo.name.toLowerCase()} saplings matching price ₹{maxPrice} and selected height/pot criteria.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={handleResetFilters}
                leftIcon={<RotateCcw size={15} />}
              >
                Reset All Filters
              </Button>
            </div>
          )}

          {/* 6. PAGINATION / LOAD MORE */}
          {hasMore && (
            <div className="text-center pt-6">
              <Button
                variant="outline"
                size="md"
                onClick={() => setPage((prev) => prev + 1)}
                rightIcon={<ArrowRight size={16} />}
              >
                Load More Saplings ({filteredProducts.length - paginatedProducts.length} Remaining)
              </Button>
            </div>
          )}
        </main>
      </div>

      {/* QUICK VIEW MODAL */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
};
