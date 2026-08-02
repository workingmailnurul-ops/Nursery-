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
import { useFirestore } from '../context/FirestoreContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Product } from '../types';
import { Button } from '../components/Button';
import { RatingStars } from '../components/RatingStars';
import { PriceTag } from '../components/PriceTag';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { products, isLoading } = useFirestore();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  // Find product by id, slug, or normalized name
  const product: Product = useMemo(() => {
    if (!products.length) return null as any;
    const cleanSlug = slug?.toLowerCase().trim();

    const found = products.find(
      (p) =>
        p.id.toLowerCase() === cleanSlug ||
        (p.slug && p.slug.toLowerCase() === cleanSlug) ||
        p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === cleanSlug
    );
    return found || products[0];
  }, [slug, products]);

  // Gallery Images Array
  const galleryImages = useMemo(() => {
    if (!product) return [];
    return [
      product.image,
      'https://images.unsplash.com/photo-1595231712325-2fecd1f532a3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?auto=format&fit=crop&w=800&q=80',
    ];
  }, [product]);

  // State
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedPotSize, setSelectedPotSize] = useState('10-inch Nursery Soil Bag');
  const [selectedAge, setSelectedAge] = useState('1.5 Year Grafted');
  const [addedNotice, setAddedNotice] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-8">
        <div className="text-center space-y-3">
          <p className="text-stone-600 font-bold">Loading product details...</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2500);
  };

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16">
      {/* BREADCRUMB */}
      <div className="bg-white border-b border-stone-200 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center gap-1.5 text-xs text-stone-500 overflow-x-auto">
          <Link to="/" className="hover:text-[#2A8A3C]">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-[#2A8A3C]">Shop</Link>
          <ChevronRight size={12} />
          <Link to={`/category/${product.category}`} className="hover:text-[#2A8A3C] capitalize">{product.category}</Link>
          <ChevronRight size={12} />
          <span className="text-stone-800 font-bold truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* MAIN PRODUCT GRID */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-2xs grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* IMAGE GALLERY */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-2xl overflow-hidden border border-stone-200 bg-stone-50 shadow-inner">
              <img
                src={galleryImages[selectedImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badgeText && (
                <span className="absolute top-4 left-4 bg-[#E8862E] text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  {product.badgeText}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition cursor-pointer shrink-0 ${
                    selectedImageIndex === idx ? 'border-[#2F5233] scale-105' : 'border-stone-200 opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* PRODUCT INFO */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-black uppercase text-emerald-800 tracking-wider bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                Category: {product.category}
              </span>

              <h1 className="text-2xl sm:text-3xl font-serif font-black text-stone-900 leading-snug">
                {product.name}
              </h1>

              {product.scientificName && (
                <p className="text-xs text-stone-500 italic font-medium">
                  Botanic Name: {product.scientificName}
                </p>
              )}

              <div className="flex items-center gap-3">
                <RatingStars rating={product.rating} showCount count={product.reviewCount} />
                <span className="text-xs text-stone-400">|</span>
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                  {product.inStock ? 'In Stock (Live Plant Guaranteed)' : 'Out of Stock'}
                </span>
              </div>

              <div className="pt-2">
                <PriceTag
                  price={product.price}
                  originalPrice={product.originalPrice}
                  size="lg"
                  showSavings
                />
              </div>

              <p className="text-xs text-stone-600 leading-relaxed pt-2 border-t border-stone-100">
                {product.description}
              </p>
            </div>

            {/* SELECTION CONTROLS */}
            <div className="space-y-4 pt-4 border-t border-stone-100">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-stone-700">Quantity:</span>
                <div className="flex items-center border border-stone-300 rounded-xl bg-[#FAF7F2]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="p-2 text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 text-xs font-bold font-mono text-stone-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="p-2 text-stone-600 hover:text-stone-900 cursor-pointer"
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 bg-[#2F5233] hover:bg-[#1E3A20] text-white font-bold text-xs sm:text-sm rounded-2xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag size={18} />
                  <span>{addedNotice ? 'Added to Cart!' : 'Add to Shopping Bag'}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-2xl border transition cursor-pointer ${
                    isInWishlist(product.id)
                      ? 'bg-rose-50 border-rose-300 text-rose-600'
                      : 'bg-white border-stone-200 text-stone-600 hover:text-rose-600'
                  }`}
                >
                  <Heart size={20} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>

            {/* TRUST BADGES */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-stone-100 text-[11px] text-stone-600">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-emerald-700" /> 100% Genuine Grafted Scion
              </div>
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-[#E8862E]" /> Moisture-Sealed Live Delivery
              </div>
            </div>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <div className="space-y-4">
          <h2 className="text-xl font-serif font-black text-[#2F5233]">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
