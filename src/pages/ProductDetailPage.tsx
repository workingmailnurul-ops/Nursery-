import React, { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Sprout,
  ShieldCheck,
  Truck,
  Clock,
  Star,
  Heart,
  Share2,
  Check,
  Plus,
  Minus,
  ShoppingBag,
  Building2,
  User,
  ChevronRight,
  Sun,
  Droplets,
  RotateCcw,
  MessageSquare,
  Send,
  ThumbsUp,
  CheckCircle2,
  Tag,
  Boxes,
  FileText,
  PhoneCall,
  X,
  Award,
} from 'lucide-react';
import { PRODUCTS, COMBO_PACKS } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Product, BulkTier } from '../types';
import { Button } from '../components/Button';
import { RatingStars } from '../components/RatingStars';
import { PriceTag } from '../components/PriceTag';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Find product by id or slug matching
  const product: Product = useMemo(() => {
    const all = [...PRODUCTS, ...COMBO_PACKS];
    const found = all.find(
      (p) =>
        p.id.toLowerCase() === slug?.toLowerCase() ||
        p.name.toLowerCase().replace(/[^a-z0-0]/g, '-') === slug?.toLowerCase()
    );
    return found || PRODUCTS[0];
  }, [slug]);

  // Gallery Images Array (Main + supplementary high quality angle images)
  const galleryImages = useMemo(() => {
    return [
      product.image,
      'https://images.unsplash.com/photo-1595231712325-2fecd1f532a3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    ];
  }, [product]);

  // State
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [purchaseMode, setPurchaseMode] = useState<'retail' | 'bulk'>('retail');
  const [quantity, setQuantity] = useState(1);
  const [bulkQuantity, setBulkQuantity] = useState(10);

  // Variant Selections
  const [selectedPotSize, setSelectedPotSize] = useState('10-inch Nursery Soil Bag');
  const [selectedAge, setSelectedAge] = useState('1.5 Year Grafted (Ready to Branch)');

  // Desktop Image Hover Zoom tracking
  const [zoomStyle, setZoomStyle] = useState<{ display: string; backgroundPosition?: string }>({
    display: 'none',
  });

  // Active Tab Below (Description | Plant Care | Delivery & Policy)
  const [activeTab, setActiveTab] = useState<'description' | 'care' | 'delivery'>('description');

  // Quick View Modal Product for Related Carousel
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toast feedback
  const [addedToast, setAddedToast] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Bulk Quote Request Modal state
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [quoteSuccess, setQuoteSuccess] = useState(false);
  const [quoteForm, setQuoteForm] = useState({ name: '', phone: '', nurseryName: '', notes: '' });

  // Reviews state & new review submission
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [newReview, setNewReview] = useState({ name: '', city: '', rating: 5, comment: '', photoUrl: '' });
  const [selectedFilter, setSelectedFilter] = useState<'all' | '5star' | '4star' | 'photos' | 'verified'>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'helpful'>('recent');

  // Initial default reviews
  const defaultReviews = useMemo(() => [
    {
      id: 'rev-1',
      name: 'Anisur Rahman',
      city: 'Dhaka',
      rating: 5,
      date: '2 weeks ago',
      verified: true,
      comment:
        'The grafted joint was firmly bound and healthy. Packed with moist coconut husk around roots inside a sturdy crate. After 3 weeks in my rooftop garden, fresh new red leaf buds have appeared!',
      photo: 'https://images.unsplash.com/photo-1595231712325-2fecd1f532a3?auto=format&fit=crop&w=600&q=80',
      helpful: 18,
    },
    {
      id: 'rev-2',
      name: 'Dr. Shahana Parveen',
      city: 'Rajshahi',
      rating: 5,
      date: '1 month ago',
      verified: true,
      comment:
        'True mother-scion graft quality. Ordered 5 saplings for my homestead orchard. Courier reached within 48 hours without any leaf wilting. Highly recommended!',
      photo: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=600&q=80',
      helpful: 24,
    },
    {
      id: 'rev-3',
      name: 'Mahmudul Hasan',
      city: 'Chittagong',
      rating: 4,
      date: '1 month ago',
      verified: true,
      comment:
        'Good plant height as promised (2.5 feet). Soil bag was still moist upon unboxing. Appreciate the clear plant care instructions included in the box.',
      helpful: 9,
    },
    {
      id: 'rev-4',
      name: 'Priya Sharma',
      city: 'Kolkata',
      rating: 5,
      date: '2 months ago',
      verified: true,
      comment:
        'Superb quality plant! Arrived in 2 days. The leaves were green and fresh, soil was moist. Great packaging by the nursery team.',
      photo: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=600&q=80',
      helpful: 15,
    },
    {
      id: 'rev-5',
      name: 'Ramesh Kumar',
      city: 'Pune',
      rating: 5,
      date: '3 months ago',
      verified: true,
      comment:
        'Exceeded my expectations! Grafting mark is strong and healthy. Already seeing new shoot growth after 10 days of planting in a 12-inch container.',
      helpful: 12,
    },
  ], []);

  // Persistent Reviews List in localStorage
  const [reviewsList, setReviewsList] = useState(() => {
    try {
      const saved = localStorage.getItem(`green_heaven_reviews_${product.id}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return defaultReviews;
  });

  // Track Helpful Votes
  const [votedReviews, setVotedReviews] = useState<Record<string, boolean>>({});

  const handleHelpfulClick = (reviewId: string) => {
    if (votedReviews[reviewId]) return;
    setVotedReviews((prev) => ({ ...prev, [reviewId]: true }));
    setReviewsList((prev: any[]) =>
      prev.map((r) => (r.id === reviewId ? { ...r, helpful: (r.helpful || 0) + 1 } : r))
    );
  };

  // Save reviews to localStorage when updated
  const saveReviewsToStorage = (updated: any[]) => {
    try {
      localStorage.setItem(`green_heaven_reviews_${product.id}`, JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }
  };

  // Price Variant Calculations
  const extraPotCost = selectedPotSize.includes('Grow Bag') ? 80 : selectedPotSize.includes('10-inch') ? 30 : 0;
  const extraAgeCost = selectedAge.includes('Ready to Fruit') ? 120 : 0;
  const currentRetailUnitPrice = product.price + extraPotCost + extraAgeCost;

  // Bulk Tier Pricing Calculation
  const getBulkTiers = (basePrice: number): BulkTier[] => [
    { minQty: 1, maxQty: 9, pricePerUnit: basePrice },
    { minQty: 10, maxQty: 49, pricePerUnit: Math.round(basePrice * 0.8) },
    { minQty: 50, pricePerUnit: Math.round(basePrice * 0.65) },
  ];

  const bulkTiers = getBulkTiers(currentRetailUnitPrice);

  const getBulkUnitPrice = (qty: number) => {
    if (qty >= 50) return Math.round(currentRetailUnitPrice * 0.65);
    if (qty >= 10) return Math.round(currentRetailUnitPrice * 0.8);
    return currentRetailUnitPrice;
  };

  const currentBulkUnitPrice = getBulkUnitPrice(bulkQuantity);
  const bulkTotalPrice = currentBulkUnitPrice * bulkQuantity;

  // Hover Zoom Handler for Desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  // Add to Cart
  const handleAddToCart = () => {
    const finalQty = purchaseMode === 'bulk' ? bulkQuantity : quantity;
    const modifiedProduct = {
      ...product,
      price: purchaseMode === 'bulk' ? currentBulkUnitPrice : currentRetailUnitPrice,
    };
    addToCart(modifiedProduct, finalQty);

    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  // Submit Bulk Quote Form
  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSuccess(true);
    setTimeout(() => {
      setQuoteSuccess(false);
      setQuoteModalOpen(false);
      setQuoteForm({ name: '', phone: '', nurseryName: '', notes: '' });
    }, 2500);
  };

  // Submit Review Form
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReview.name && newReview.comment) {
      const updatedList = [
        {
          id: `rev-${Date.now()}`,
          name: newReview.name,
          city: newReview.city || 'Verified Gardener',
          rating: newReview.rating,
          date: 'Just now',
          verified: true,
          comment: newReview.comment,
          photo: newReview.photoUrl || undefined,
          helpful: 0,
        },
        ...reviewsList,
      ];
      setReviewsList(updatedList);
      saveReviewsToStorage(updatedList);
      setReviewSubmitted(true);
      setTimeout(() => {
        setReviewSubmitted(false);
        setReviewFormOpen(false);
        setNewReview({ name: '', city: '', rating: 5, comment: '', photoUrl: '' });
      }, 2000);
    }
  };

  // Filtered and Sorted Reviews List
  const filteredAndSortedReviews = useMemo(() => {
    let result = [...reviewsList];

    if (selectedFilter === '5star') {
      result = result.filter((r) => r.rating === 5);
    } else if (selectedFilter === '4star') {
      result = result.filter((r) => r.rating === 4);
    } else if (selectedFilter === 'photos') {
      result = result.filter((r) => !!r.photo);
    } else if (selectedFilter === 'verified') {
      result = result.filter((r) => r.verified);
    }

    if (sortBy === 'highest') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'helpful') {
      result.sort((a, b) => (b.helpful || 0) - (a.helpful || 0));
    }

    return result;
  }, [reviewsList, selectedFilter, sortBy]);

  // Related Products
  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.id !== product.id).slice(0, 4);
  }, [product]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10">
      {/* 1. BREADCRUMBS */}
      <nav aria-label="Breadcrumb" className="flex items-center text-xs text-stone-500 gap-1.5 flex-wrap">
        <Link to="/" className="hover:text-[#2F5233] font-medium transition-colors">
          Home
        </Link>
        <ChevronRight size={12} className="text-stone-400" />
        <Link to="/shop" className="hover:text-[#2F5233] font-medium transition-colors">
          Fruit Saplings
        </Link>
        <ChevronRight size={12} className="text-stone-400" />
        <Link to={`/category/${product.category}`} className="hover:text-[#2F5233] font-medium transition-colors capitalize">
          {product.category}
        </Link>
        <ChevronRight size={12} className="text-stone-400" />
        <span className="font-bold text-[#2F5233] truncate max-w-xs">{product.name}</span>
      </nav>

      {/* 2. MAIN PRODUCT SUMMARY SECTION */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COLUMN: IMAGE GALLERY WITH HOVER ZOOM */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Display Image */}
          <div
            className="relative h-80 sm:h-96 w-full rounded-2xl bg-[#FAF7F2] border border-stone-200 overflow-hidden cursor-crosshair group flex items-center justify-center p-4"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={galleryImages[selectedImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover object-center rounded-xl transition-all"
            />

            {/* Desktop Zoom Overlay Container */}
            <div
              className="absolute inset-0 pointer-events-none rounded-2xl bg-no-repeat z-20 shadow-inner transition-opacity duration-200"
              style={{
                ...zoomStyle,
                backgroundImage: `url(${galleryImages[selectedImageIndex]})`,
                backgroundSize: '220%',
              }}
            />

            {/* Badges on Image */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
              <span className="bg-[#2F5233] text-white font-extrabold text-[10px] uppercase px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1">
                <Sprout size={12} /> Genuine Grafted Scion
              </span>
              {product.badgeText && (
                <span className="bg-[#E8862E] text-white font-bold text-[10px] px-2.5 py-0.5 rounded-lg shadow-2xs">
                  {product.badgeText}
                </span>
              )}
            </div>

            {/* Wishlist & Share Floating Buttons */}
            <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`p-2.5 rounded-full backdrop-blur-md shadow-md transition-all ${
                  isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/80 text-stone-600 hover:bg-white hover:text-rose-500'
                }`}
                title="Save to Wishlist"
              >
                <Heart size={18} className={isWishlisted ? 'fill-white' : ''} />
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Product link copied to clipboard!');
                }}
                className="p-2.5 rounded-full bg-white/80 backdrop-blur-md text-stone-600 hover:bg-white hover:text-[#2F5233] shadow-md transition-all"
                title="Share Plant"
              >
                <Share2 size={18} />
              </button>
            </div>

            {/* Fruiting Time Banner */}
            <div className="absolute bottom-3 left-3 right-3 bg-black/70 backdrop-blur-md text-white text-xs py-1.5 px-3 rounded-xl flex justify-between items-center z-10">
              <span className="flex items-center gap-1.5 text-stone-300">
                <Clock size={14} className="text-[#E8862E]" /> Fruiting Timeline:
              </span>
              <span className="font-extrabold text-amber-300">{product.fruitingTime}</span>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="grid grid-cols-4 gap-3">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`h-20 rounded-xl overflow-hidden border-2 transition-all bg-[#FAF7F2] ${
                  selectedImageIndex === idx ? 'border-[#2F5233] ring-2 ring-[#2F5233]/30 scale-102' : 'border-stone-200 opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          {/* Live Delivery Guarantee Banner */}
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200 flex items-center gap-3 text-xs text-stone-700">
            <ShieldCheck size={28} className="text-emerald-700 shrink-0" />
            <div>
              <span className="font-bold text-[#2F5233] block">100% Live Arrival & Growth Guarantee</span>
              <p className="text-[11px] text-stone-500 leading-tight">
                Shipped in moisture-retaining root gel packaging. If damaged in transit, we send a 100% free replacement sapling!
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PRODUCT META, VARIANTS, TABS & ADD TO CART */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-2 border-b border-stone-200 pb-4">
            <span className="text-[11px] font-extrabold text-[#E8862E] uppercase tracking-wider block">
              {product.category} • Certified Mother Scion
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#2F5233] leading-tight">
              {product.name}
            </h1>
            {product.scientificName && (
              <p className="text-xs italic text-stone-500 font-medium">
                Scientific Name: {product.scientificName}
              </p>
            )}

            {/* Rating Anchor link */}
            <div className="flex items-center gap-3 pt-1">
              <RatingStars rating={product.rating} count={product.reviewCount} size={16} />
              <a href="#customer-reviews" className="text-xs text-[#2F5233] font-bold underline hover:text-[#E8862E]">
                Read {product.reviewCount} Reviews
              </a>
              <span className="text-stone-300">•</span>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                In Stock (Ready to Courier)
              </span>
            </div>
          </div>

          {/* PURCHASE MODE TOGGLE: RETAIL VS BULK TAB */}
          <div className="bg-[#FAF7F2] p-1.5 rounded-2xl border border-stone-200 flex items-center gap-1">
            <button
              onClick={() => setPurchaseMode('retail')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                purchaseMode === 'retail'
                  ? 'bg-[#2F5233] text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <User size={15} /> Retail (Single Sapling)
            </button>
            <button
              onClick={() => setPurchaseMode('bulk')}
              className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 ${
                purchaseMode === 'bulk'
                  ? 'bg-[#E8862E] text-white shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Building2 size={15} /> Wholesale / Bulk Tiers
            </button>
          </div>

          {/* MODE 1: RETAIL PURCHASE FLOW */}
          {purchaseMode === 'retail' ? (
            <div className="space-y-6 animate-fadeIn">
              {/* PRICE BLOCK */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-stone-500 block font-medium">Price per Sapling</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-serif font-black text-[#2F5233]">
                      ₹{currentRetailUnitPrice}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-stone-400 line-through font-medium">
                        ₹{product.originalPrice + extraPotCost + extraAgeCost}
                      </span>
                    )}
                  </div>
                </div>
                {product.originalPrice && (
                  <span className="bg-rose-100 text-rose-700 font-extrabold text-xs px-2.5 py-1 rounded-lg border border-rose-200">
                    Save {Math.round((1 - currentRetailUnitPrice / (product.originalPrice + extraPotCost + extraAgeCost)) * 100)}% OFF
                  </span>
                )}
              </div>

              {/* VARIANT SELECTORS */}
              <div className="space-y-4">
                {/* Variant 1: Pot Size / Root Bag */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 block">
                    Select Pot Packaging Size:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      '10-inch Nursery Soil Bag',
                      '12-inch Heavy Grow Bag (+₹80)',
                    ].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedPotSize(opt)}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition text-left ${
                          selectedPotSize === opt
                            ? 'bg-[#2F5233] text-white border-[#2F5233] shadow-xs'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Variant 2: Plant Age & Height */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-700 block">
                    Select Plant Age & Scion Maturity:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      '1.5 Year Grafted (Ready to Branch)',
                      '2.5 Year Grafted - Ready to Fruit (+₹120)',
                    ].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setSelectedAge(opt)}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition text-left ${
                          selectedAge === opt
                            ? 'bg-[#2F5233] text-white border-[#2F5233] shadow-xs'
                            : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* QUANTITY STEPPER & ACTION BUTTONS */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-bold text-stone-700">Quantity:</span>
                  <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-[#FAF7F2]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-stone-600 hover:bg-stone-200"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 text-xs font-black text-[#2F5233]">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-stone-600 hover:bg-stone-200"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-2">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button
                      variant={addedToast ? 'primary' : 'accent'}
                      size="lg"
                      fullWidth
                      onClick={handleAddToCart}
                      leftIcon={addedToast ? <Check size={18} /> : <ShoppingBag size={18} />}
                    >
                      {addedToast ? 'Added to Cart!' : 'Add to Cart'}
                    </Button>

                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={handleBuyNow}
                    >
                      Buy Now
                    </Button>
                  </div>

                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-center gap-2 cursor-pointer text-xs font-bold shrink-0 ${
                      isInWishlist(product.id)
                        ? 'bg-[#FF5252] text-white border-[#FF5252] shadow-xs'
                        : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-50 hover:text-[#FF5252]'
                    }`}
                    title={isInWishlist(product.id) ? 'Saved in Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart size={18} className={isInWishlist(product.id) ? 'fill-white' : ''} />
                    <span className="sm:hidden">{isInWishlist(product.id) ? 'In Wishlist' : 'Wishlist'}</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* MODE 2: BULK WHOLESALE PURCHASE FLOW */
            <div className="space-y-6 animate-fadeIn bg-amber-50/50 p-5 rounded-2xl border border-amber-200">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#E8862E] flex items-center gap-1">
                  <Boxes size={15} /> Wholesale Volume Tier Pricing
                </span>
                <p className="text-xs text-stone-600">
                  Select or type quantity below to automatically unlock volume discount tiers. Minimum 10 units for bulk orders.
                </p>
              </div>

              {/* TIERED PRICING TABLE */}
              <div className="bg-white rounded-xl border border-stone-200 overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-[#FAF7F2] text-stone-600 font-bold border-b border-stone-200">
                    <tr>
                      <th className="p-2.5">Quantity Tier</th>
                      <th className="p-2.5">Price Per Unit</th>
                      <th className="p-2.5 text-right">Discount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100">
                    {bulkTiers.map((tier, idx) => {
                      const isActive =
                        bulkQuantity >= tier.minQty &&
                        (!tier.maxQty || bulkQuantity <= tier.maxQty);
                      return (
                        <tr
                          key={idx}
                          className={isActive ? 'bg-amber-100/70 font-bold text-[#2F5233]' : 'text-stone-700'}
                        >
                          <td className="p-2.5">
                            {tier.minQty} - {tier.maxQty || '50+'} pcs
                          </td>
                          <td className="p-2.5 font-bold">₹{tier.pricePerUnit}</td>
                          <td className="p-2.5 text-right font-bold text-emerald-700">
                            {tier.minQty === 1 ? 'Standard' : tier.minQty === 10 ? '20% OFF' : '35% OFF'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* LIVE BULK CALCULATOR INPUT */}
              <div className="space-y-2 bg-white p-4 rounded-xl border border-stone-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-800">
                    Enter Desired Bulk Quantity:
                  </label>
                  <span className="text-[11px] text-amber-800 font-bold">
                    (Min 10 units for bulk discount)
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="10"
                    step="5"
                    value={bulkQuantity}
                    onChange={(e) => setBulkQuantity(Math.max(1, Number(e.target.value)))}
                    className="w-28 bg-[#FAF7F2] border border-stone-300 rounded-xl px-3 py-2 text-sm font-black text-[#2F5233] focus:ring-2 focus:ring-[#2F5233]"
                  />
                  <div className="text-right flex-1">
                    <span className="text-[11px] text-stone-500 block">
                      Effective Rate: <strong>₹{currentBulkUnitPrice}/unit</strong>
                    </span>
                    <span className="text-xl font-serif font-black text-[#2F5233]">
                      Total: ₹{bulkTotalPrice.toLocaleString()}
                    </span>
                  </div>
                </div>

                {bulkQuantity < 10 && (
                  <p className="text-[11px] text-rose-600 font-bold">
                    ⚠️ Order at least 10 units to qualify for bulk wholesale pricing!
                  </p>
                )}
              </div>

              {/* BULK ACTION BUTTONS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  variant="accent"
                  size="lg"
                  fullWidth
                  onClick={handleAddToCart}
                  disabled={bulkQuantity < 10}
                  leftIcon={<ShoppingBag size={18} />}
                >
                  Add Bulk Order to Cart
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={() => setQuoteModalOpen(true)}
                  leftIcon={<FileText size={18} />}
                >
                  Request Bulk Quote
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. TABS / ACCORDION BELOW SUMMARY */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* TAB HEADERS */}
        <div className="flex items-center gap-2 border-b border-stone-200 overflow-x-auto pb-2">
          {[
            { id: 'description', label: 'Variety Description & Features', icon: <Sprout size={16} /> },
            { id: 'care', label: 'Plant Care & Fertilization', icon: <Sun size={16} /> },
            { id: 'delivery', label: 'Courier Delivery & Guarantee Policy', icon: <Truck size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition shrink-0 ${
                activeTab === tab.id
                  ? 'bg-[#2F5233] text-white shadow-xs'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: DESCRIPTION */}
        {activeTab === 'description' && (
          <div className="space-y-4 text-xs text-stone-700 leading-relaxed animate-fadeIn">
            <h3 className="text-base font-serif font-bold text-[#2F5233]">
              About {product.name}
            </h3>
            <p className="text-stone-600 text-sm">{product.description}</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200 space-y-1">
                <span className="font-bold text-[#2F5233] text-xs block">🌱 Graft Technique</span>
                <p className="text-stone-600 text-xs">{product.graftType}</p>
              </div>
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200 space-y-1">
                <span className="font-bold text-[#2F5233] text-xs block">⏱️ Fruiting Time</span>
                <p className="text-stone-600 text-xs">{product.fruitingTime}</p>
              </div>
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200 space-y-1">
                <span className="font-bold text-[#2F5233] text-xs block">📏 Plant Height</span>
                <p className="text-stone-600 text-xs">{product.height}</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: CARE INSTRUCTIONS */}
        {activeTab === 'care' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs animate-fadeIn">
            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200 space-y-2">
              <span className="font-bold text-[#2F5233] flex items-center gap-2 text-sm">
                <Sun size={18} className="text-[#E8862E]" /> Sunlight Requirements
              </span>
              <p className="text-stone-600 leading-relaxed">
                Requires direct full sunlight for 6-8 hours daily. Ideal for open rooftop gardens, sunny balconies, or farm orchards.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200 space-y-2">
              <span className="font-bold text-[#2F5233] flex items-center gap-2 text-sm">
                <Droplets size={18} className="text-sky-600" /> Watering & Soil Drainage
              </span>
              <p className="text-stone-600 leading-relaxed">
                Water thoroughly when topsoil feels dry to the touch. Ensure pot has bottom drainage holes to prevent root rot.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200 space-y-2">
              <span className="font-bold text-[#2F5233] flex items-center gap-2 text-sm">
                <Sprout size={18} className="text-emerald-700" /> Fertilizer & Organic Care
              </span>
              <p className="text-stone-600 leading-relaxed">
                Feed monthly with organic vermicompost, bone meal, and mustard oil cake tea. Apply micronutrient spray before flowering season.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-5 rounded-2xl border border-stone-200 space-y-2">
              <span className="font-bold text-[#2F5233] flex items-center gap-2 text-sm">
                <Award size={18} className="text-amber-600" /> Pruning & Blossom Care
              </span>
              <p className="text-stone-600 leading-relaxed">
                Pinch off initial blossoms during the first 6 months to direct sap energy toward strong main branch & root formation.
              </p>
            </div>
          </div>
        )}

        {/* TAB 3: DELIVERY & GUARANTEE POLICY */}
        {activeTab === 'delivery' && (
          <div className="space-y-4 text-xs text-stone-700 leading-relaxed animate-fadeIn">
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl space-y-2 text-emerald-900">
              <span className="font-extrabold flex items-center gap-2 text-sm">
                <ShieldCheck size={18} className="text-emerald-700" /> Live Arrival Guarantee
              </span>
              <p className="text-xs">
                All plants are carefully wrapped in moisture-sealed coco-peat root gel and anchored inside reinforced double-wall corrugated crates to endure 48-72 hour transit.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200 space-y-1">
                <span className="font-bold text-[#2F5233]">🚚 Delivery Timelines</span>
                <p className="text-stone-600 text-xs">
                  Dhaka City: 24-48 Hours • Outside Dhaka / Divisional Districts: 48-72 Hours via Express Courier.
                </p>
              </div>

              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200 space-y-1">
                <span className="font-bold text-[#2F5233]">🔄 Free Replacement Policy</span>
                <p className="text-stone-600 text-xs">
                  In the rare event of severe transit damage or stem breakage, take an unboxing photo and send via WhatsApp for a 100% free replacement sapling.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. CUSTOMER REVIEWS & SOCIAL PROOF SECTION */}
      <section id="customer-reviews" className="bg-white rounded-3xl border border-stone-200 shadow-sm p-6 sm:p-8 space-y-8">
        {/* HEADER & WRITE A REVIEW ACTION */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-serif font-black text-[#2F5233]">
                Customer Reviews & Social Proof
              </h2>
              <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-2.5 py-0.5 rounded-full border border-emerald-300">
                {product.reviewCount} Ratings
              </span>
            </div>
            <p className="text-xs text-stone-500 mt-0.5">
              Verified feedback & unboxing photos from home gardeners and orchard owners.
            </p>
          </div>

          <Button
            variant="accent"
            size="md"
            onClick={() => setReviewFormOpen(!reviewFormOpen)}
            leftIcon={<MessageSquare size={16} />}
          >
            {reviewFormOpen ? 'Close Review Form' : 'Write a Review'}
          </Button>
        </div>

        {/* EXPANDABLE WRITE A REVIEW FORM */}
        {reviewFormOpen && (
          <form
            onSubmit={handleReviewSubmit}
            className="bg-[#FAF7F2] p-6 rounded-2xl border border-stone-200 space-y-4 animate-fadeIn"
          >
            <h3 className="font-serif font-bold text-base text-[#2F5233]">
              Share Your Unboxing & Growth Experience
            </h3>

            {reviewSubmitted ? (
              <div className="bg-emerald-100 text-emerald-800 p-4 rounded-xl font-bold text-xs flex items-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-600" />
                Thank you! Your verified review has been published.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mahfuz Alam"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#2F5233]"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-stone-700 block mb-1">Your City / Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Uttara, Dhaka"
                    value={newReview.city}
                    onChange={(e) => setNewReview({ ...newReview, city: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#2F5233]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-stone-700 block mb-1">Star Rating</label>
                  <div className="flex gap-1 items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="text-amber-400 hover:scale-110 transition-transform p-1"
                      >
                        <Star size={22} className={star <= newReview.rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'} />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-stone-600 ml-2">
                      {newReview.rating === 5 ? '5/5 Excellent' : `${newReview.rating}/5 Stars`}
                    </span>
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-stone-700 block mb-1">
                    Photo Attachment URL (Optional)
                  </label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/... or image link"
                    value={newReview.photoUrl}
                    onChange={(e) => setNewReview({ ...newReview, photoUrl: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#2F5233]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-stone-700 block mb-1">Your Review Comment</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="How was the plant condition, packaging, and leaf health upon unboxing?"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full bg-white border border-stone-300 rounded-xl p-3 text-xs focus:ring-2 focus:ring-[#2F5233]"
                  />
                </div>

                <div className="sm:col-span-2 pt-2">
                  <Button variant="primary" size="md" type="submit" rightIcon={<Send size={15} />}>
                    Submit Customer Review
                  </Button>
                </div>
              </div>
            )}
          </form>
        )}

        {/* OVERALL RATING & ASPECT SATISFACTION SUMMARY */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#FAF7F2] p-6 rounded-2xl border border-stone-200 items-center">
          {/* Rating Score Badge */}
          <div className="md:col-span-4 text-center md:text-left space-y-1 md:border-r border-stone-200 md:pr-6">
            <div className="flex items-baseline justify-center md:justify-start gap-2">
              <span className="text-5xl font-serif font-black text-[#2F5233]">{product.rating}</span>
              <span className="text-stone-400 text-sm font-bold">/ 5.0</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-1 py-1">
              <RatingStars rating={product.rating} size={20} />
            </div>
            <p className="text-xs font-bold text-emerald-800 flex items-center justify-center md:justify-start gap-1">
              <CheckCircle2 size={14} className="text-emerald-600" />
              98% of buyers recommend this plant
            </p>
            <p className="text-[11px] text-stone-500">Based on {product.reviewCount} customer reviews</p>
          </div>

          {/* Aspect Ratings Bars */}
          <div className="md:col-span-8 space-y-3 text-xs">
            <span className="font-bold text-stone-700 block text-xs uppercase tracking-wider">
              Verified Plant Performance Index
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white p-3 rounded-xl border border-stone-200 text-center space-y-1">
                <span className="text-stone-500 text-[11px] block">Live Plant Arrival</span>
                <span className="text-sm font-black text-[#2F5233]">99% Fresh</span>
                <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 w-[99%]" />
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200 text-center space-y-1">
                <span className="text-stone-500 text-[11px] block">Root Gel Packaging</span>
                <span className="text-sm font-black text-[#2F5233]">97% Excellent</span>
                <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 w-[97%]" />
                </div>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200 text-center space-y-1">
                <span className="text-stone-500 text-[11px] block">True Variety Scion</span>
                <span className="text-sm font-black text-[#2F5233]">100% Certified</span>
                <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-600 w-[100%]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CUSTOMER UNBOXING PHOTO GALLERY */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <Sprout size={16} className="text-[#E8862E]" /> Customer Photos & Unboxing Snapshots
            </h3>
            <span className="text-[11px] text-stone-500 font-medium">Real photos submitted by buyers</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {reviewsList.filter(r => r.photo).slice(0, 4).map((r, i) => (
              <div key={i} className="relative group rounded-xl overflow-hidden border border-stone-200 h-28 bg-[#FAF7F2]">
                <img src={r.photo} alt={`Customer review photo ${i+1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-90 p-2 flex flex-col justify-end text-white text-[10px]">
                  <span className="font-bold truncate">{r.name}</span>
                  <span className="text-stone-300 text-[9px]">{r.city}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FILTER BAR & SORTING CONTROLS */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-[#FAF7F2] p-3 rounded-2xl border border-stone-200">
          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all', label: 'All Reviews' },
              { id: '5star', label: '5 Stars ★' },
              { id: '4star', label: '4 Stars ★' },
              { id: 'photos', label: 'With Photos 📷' },
              { id: 'verified', label: 'Verified Buyers ✓' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  selectedFilter === f.id
                    ? 'bg-[#2F5233] text-white shadow-xs'
                    : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs shrink-0 self-end sm:self-auto">
            <span className="text-stone-500 font-medium">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-stone-300 rounded-xl px-2.5 py-1 text-xs font-bold text-stone-800 focus:ring-2 focus:ring-[#2F5233]"
            >
              <option value="recent">Most Recent</option>
              <option value="highest">Highest Rating</option>
              <option value="helpful">Most Helpful</option>
            </select>
          </div>
        </div>

        {/* REVIEWS LIST */}
        <div className="space-y-4">
          {filteredAndSortedReviews.length === 0 ? (
            <div className="text-center py-8 text-stone-500 text-xs">
              No reviews match the selected filter. Try changing the filter tab above.
            </div>
          ) : (
            filteredAndSortedReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs space-y-3 hover:border-stone-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#2F5233] text-white font-serif font-bold flex items-center justify-center text-sm shadow-xs shrink-0">
                      {rev.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-xs text-[#2F5233] flex items-center gap-2">
                        {rev.name}
                        {rev.verified && (
                          <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 flex items-center gap-1">
                            <CheckCircle2 size={10} /> Verified Buyer
                          </span>
                        )}
                      </h4>
                      <span className="text-[10px] text-stone-400">{rev.city} • {rev.date}</span>
                    </div>
                  </div>

                  <RatingStars rating={rev.rating} size={14} />
                </div>

                <p className="text-xs text-stone-700 leading-relaxed font-medium">{rev.comment}</p>

                {rev.photo && (
                  <div className="pt-1">
                    <img
                      src={rev.photo}
                      alt="Review attachment"
                      className="w-20 h-20 object-cover rounded-xl border border-stone-200 shadow-xs hover:scale-105 transition-transform cursor-pointer"
                      onClick={() => window.open(rev.photo, '_blank')}
                    />
                  </div>
                )}

                {/* Helpful Upvote Button */}
                <div className="pt-2 flex items-center justify-between text-[11px] border-t border-stone-100 text-stone-500">
                  <span>Was this review helpful to you?</span>
                  <button
                    onClick={() => handleHelpfulClick(rev.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition font-bold ${
                      votedReviews[rev.id]
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                        : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <ThumbsUp size={12} className={votedReviews[rev.id] ? 'fill-emerald-600 text-emerald-600' : ''} />
                    <span>{votedReviews[rev.id] ? 'Helpful!' : 'Helpful'} ({rev.helpful || 0})</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 5. YOU MAY ALSO LIKE - RELATED PRODUCTS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-stone-200 pb-3">
          <h2 className="text-2xl font-serif font-black text-[#2F5233] flex items-center gap-2">
            <Sprout size={24} className="text-[#E8862E]" /> You May Also Like
          </h2>
          <Link to="/shop" className="text-xs font-bold text-[#2F5233] hover:text-[#E8862E] flex items-center gap-1">
            View All Fruit Trees <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedProducts.map((relProduct) => (
            <ProductCard
              key={relProduct.id}
              product={relProduct}
              onAddToCart={(p) => addToCart(p, 1)}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* REQUEST BULK QUOTE MODAL */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-5 shadow-2xl border border-stone-200 relative animate-scaleUp">
            <button
              onClick={() => setQuoteModalOpen(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
            >
              <X size={20} />
            </button>

            <div className="space-y-1">
              <span className="text-xs font-bold uppercase text-[#E8862E] tracking-wider flex items-center gap-1">
                <Building2 size={14} /> Wholesale Nursery Quotation
              </span>
              <h3 className="font-serif font-bold text-xl text-[#2F5233]">
                Request Bulk Price Quote
              </h3>
              <p className="text-xs text-stone-500">
                Item: <strong>{product.name}</strong> ({bulkQuantity} units requested)
              </p>
            </div>

            {quoteSuccess ? (
              <div className="bg-emerald-100 text-emerald-800 p-6 rounded-2xl text-center space-y-2">
                <CheckCircle2 size={36} className="mx-auto text-emerald-600" />
                <h4 className="font-serif font-bold text-base">Quote Request Received!</h4>
                <p className="text-xs text-stone-600">
                  Our wholesale nursery representative will contact you via phone/WhatsApp within 2 hours with customized transport and tier pricing.
                </p>
              </div>
            ) : (
              <form onSubmit={handleQuoteSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="font-bold text-stone-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kazi Tariqul Islam"
                    value={quoteForm.name}
                    onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-[#2F5233]"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Phone Number / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+880 1700-000000"
                    value={quoteForm.phone}
                    onChange={(e) => setQuoteForm({ ...quoteForm, phone: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-[#2F5233]"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Nursery / Farm / Project Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Green Valley Homestead Project"
                    value={quoteForm.nurseryName}
                    onChange={(e) => setQuoteForm({ ...quoteForm, nurseryName: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl px-3.5 py-2 focus:ring-2 focus:ring-[#2F5233]"
                  />
                </div>

                <div>
                  <label className="font-bold text-stone-700 block mb-1">Special Requirements / Transport Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Specific plant age preference, pickup at nursery, or district courier destination..."
                    value={quoteForm.notes}
                    onChange={(e) => setQuoteForm({ ...quoteForm, notes: e.target.value })}
                    className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl p-3 focus:ring-2 focus:ring-[#2F5233]"
                  />
                </div>

                <div className="pt-2">
                  <Button variant="accent" size="lg" fullWidth type="submit" rightIcon={<Send size={16} />}>
                    Submit Official Quote Request
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
};
