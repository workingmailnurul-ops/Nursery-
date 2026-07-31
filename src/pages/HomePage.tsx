import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Sprout,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Box,
  MessageSquareQuote,
  ArrowRight,
  CheckCircle2,
  Phone,
  Send,
  X,
  FileText,
  Clock,
  BookOpen,
  Percent,
  Award,
  Users,
  Tag,
  ArrowUp,
} from 'lucide-react';

import {
  HERO_SLIDES,
  FRUIT_CATEGORIES,
  PRODUCTS,
  COMBO_PACKS,
  TESTIMONIALS,
  BLOG_POSTS,
} from '../data/products';
import { Product } from '../types';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';

interface HomePageProps {
  onAddToCart: (product: Product, quantity?: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onAddToCart }) => {
  const navigate = useNavigate();

  // 1. Hero Carousel state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Quick view modal product state
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Bulk Enquiry Modal state
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [bulkSubmitted, setBulkSubmitted] = useState(false);
  const [bulkForm, setBulkForm] = useState({
    name: '',
    phone: '',
    plantInterest: 'Haribhanga Mango (Commercial)',
    estimatedQuantity: '100 - 500 Saplings',
    location: '',
  });

  // Testimonials slide index
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Auto-advance hero carousel
  useEffect(() => {
    if (!isAutoPlay) return;
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isAutoPlay]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const quickCategories = [
    { name: 'OFFERS', isOffer: true, icon: '%', path: '/shop?tag=discount' },
    { name: 'GARDENING', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=200&q=80', path: '/care-guide' },
    { name: 'PLANTS', img: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=200&q=80', path: '/shop' },
    { name: 'SEEDS', img: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=200&q=80', path: '/shop?cat=accessories' },
    { name: 'BULBS', img: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=200&q=80', path: '/shop?cat=accessories' },
    { name: 'POTS', img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=200&q=80', path: '/shop?cat=accessories' },
    { name: 'FERTILIZERS', img: 'https://images.unsplash.com/photo-1615811361523-6bd03d7748e7?auto=format&fit=crop&w=200&q=80', path: '/shop?cat=accessories' },
    { name: 'CORPORATE', img: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8?auto=format&fit=crop&w=200&q=80', path: '/shop?type=wholesale' },
    { name: 'PEBBLES', img: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=200&q=80', path: '/shop?cat=accessories' },
    { name: 'ACCESSORIES', img: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=200&q=80', path: '/shop?cat=accessories' },
  ];

  const trendingItems = [
    { title: 'Bonsai Plants - Upto 25% Off', img: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=400&q=80', path: '/shop' },
    { title: 'Ceramic Planters - Starting ₹299', img: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=400&q=80', path: '/shop?cat=accessories' },
    { title: 'Kokedama - Starting ₹249', img: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=400&q=80', path: '/shop' },
    { title: 'Month Wise Gardening - Upto 65% Off', img: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80', path: '/care-guide' },
  ];

  return (
    <div className="space-y-8 sm:space-y-12 pb-20 bg-white">
      {/* ==========================================
          SECTION 0: CIRCULAR CATEGORY BUBBLES ROW (Screenshot 4)
         ========================================== */}
      <section className="bg-white py-3 border-b border-stone-200/60 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-start sm:justify-center gap-4 sm:gap-6 min-w-max">
          {quickCategories.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="flex flex-col items-center group cursor-pointer"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border border-stone-200 group-hover:border-[#FF5252] shadow-2xs transition-transform duration-200 group-hover:scale-105 flex items-center justify-center bg-[#FAF7F2]">
                {item.isOffer ? (
                  <div className="w-full h-full bg-[#FF5252] text-white flex items-center justify-center font-black text-2xl">
                    %
                  </div>
                ) : (
                  <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=200&q=80';
                    }}
                  />
                )}
              </div>
              <span className={`text-[10px] font-bold mt-1.5 uppercase tracking-tight ${item.isOffer ? 'text-[#FF5252]' : 'text-stone-700 group-hover:text-[#FF5252]'}`}>
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ==========================================
          SECTION 1: HERO BANNER CAROUSEL (Screenshots 2, 3, 4, 5)
         ========================================== */}
      <section
        className="relative w-full h-[220px] sm:h-[300px] lg:h-[340px] bg-stone-100 overflow-hidden my-2 sm:my-4"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        {[
          {
            title: 'Garden Pack',
            subtitle: 'Get up to 10% OFF',
            bgColor: 'bg-[#00897B]',
            image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=1000&q=80',
          },
          {
            title: "Plants' Packs",
            subtitle: 'Get up to 35% OFF',
            bgColor: 'bg-[#00796B]',
            image: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=1000&q=80',
          },
          {
            title: 'Succulents',
            subtitle: 'Get up to 35% OFF',
            bgColor: 'bg-[#2E7D32]',
            image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1000&q=80',
          },
          {
            title: 'Seeds',
            subtitle: 'Flat 50% OFF',
            bgColor: 'bg-[#558B2F]',
            image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=1000&q=80',
          },
        ].map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              idx === currentSlideIndex ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <div className="w-full h-full flex items-stretch">
              {/* Left Side: Solid Color Block with angled right edge */}
              <div
                className={`${slide.bgColor} text-white w-[60%] sm:w-[52%] p-4 sm:p-8 flex flex-col justify-center space-y-1.5 sm:space-y-3 relative z-10`}
                style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}
              >
                <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
                  {slide.title}
                </h2>
                <p className="text-xs sm:text-base font-semibold text-white/95">
                  {slide.subtitle}
                </p>
                <div className="pt-1">
                  <button
                    onClick={() => navigate('/shop')}
                    className="bg-[#FF5252] hover:bg-[#e04343] text-white font-extrabold text-xs sm:text-sm px-4 sm:px-6 py-2 rounded-xs shadow-md uppercase tracking-wider cursor-pointer"
                  >
                    SHOP NOW
                  </button>
                </div>
              </div>

              {/* Right Side Image */}
              <div className="w-[50%] sm:w-[58%] -ml-[10%] h-full relative overflow-hidden">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Top right Pause Button */}
            <button
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className="absolute top-2 right-2 z-20 bg-stone-900/40 text-white p-1 rounded-xs hover:bg-stone-900/60 transition"
              title="Pause slide"
            >
              <span className="font-mono text-[10px] px-1 font-bold">||</span>
            </button>
          </div>
        ))}

        {/* Indicators Dots matching screenshot 2, 3, 4 */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {[0, 1, 2, 3].map((idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlideIndex(idx)}
              className={`transition-all ${
                idx === currentSlideIndex
                  ? 'w-2.5 h-2.5 bg-black rounded-xs'
                  : 'w-2.5 h-2.5 border border-stone-500 rounded-full bg-white/70'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ==========================================
          APP BANNER / PROMO STRIP (Screenshot 4)
         ========================================== */}
      <section className="bg-[#FAF7F2] py-4 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 text-center space-y-2">
          <p className="text-xs sm:text-sm font-bold text-stone-800">
            Happiness is availing great offers on Nurserylive App!
          </p>
          <div className="flex items-center justify-center gap-3">
            <a href="https://play.google.com" target="_blank" rel="noreferrer" className="inline-block">
              <span className="bg-stone-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-2xs">
                ▶ GET IT ON <strong>Google Play</strong>
              </span>
            </a>
            <a href="https://apple.com" target="_blank" rel="noreferrer" className="inline-block">
              <span className="bg-stone-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-md flex items-center gap-1.5 shadow-2xs">
                 Download on the <strong>App Store</strong>
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* ==========================================
          SECTION 2: QUICK SERVICE LINKS GRID (Screenshot 3)
         ========================================== */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-[#F8F8F8] rounded-xl p-4 sm:p-6 border border-stone-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <Link to="/care-guide" className="flex flex-col items-center justify-center p-3 hover:bg-white rounded-lg transition">
            <Users size={32} className="text-stone-700 mb-1.5" />
            <span className="text-xs font-bold text-stone-800">Help Center</span>
          </Link>

          <Link to="/track-order" className="flex flex-col items-center justify-center p-3 hover:bg-white rounded-lg transition">
            <Truck size={32} className="text-stone-700 mb-1.5" />
            <span className="text-xs font-bold text-stone-800">Track Order</span>
          </Link>

          <Link to="/orders" className="flex flex-col items-center justify-center p-3 hover:bg-white rounded-lg transition">
            <Award size={32} className="text-stone-700 mb-1.5" />
            <span className="text-xs font-bold text-stone-800">Rewards</span>
          </Link>

          <Link to="/shop?tag=discount" className="flex flex-col items-center justify-center p-3 hover:bg-white rounded-lg transition">
            <Tag size={32} className="text-stone-700 mb-1.5" />
            <span className="text-xs font-bold text-stone-800">Offers</span>
          </Link>
        </div>
      </section>

      {/* ==========================================
          SECTION 3: TRENDING CIRCULAR CATEGORIES (Screenshot 2)
         ========================================== */}
      <section className="max-w-7xl mx-auto px-4 py-4">
        <h2 className="text-lg sm:text-xl font-bold text-stone-900 text-center mb-6">
          Trending
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {trendingItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full overflow-hidden border-2 border-stone-200 group-hover:border-[#FF5252] transition-transform duration-300 group-hover:scale-105 shadow-xs bg-[#FAF7F2]">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80';
                  }}
                />
              </div>
              <h3 className="mt-3 text-xs sm:text-sm font-bold text-[#FF5252] group-hover:underline max-w-[180px]">
                {item.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* ==========================================
          SECTION 4: VALUE FOR MONEY - UPTO 35% OFF (Screenshot 3)
         ========================================== */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6 py-4">
        <h2 className="text-stone-700 font-bold tracking-widest text-xs sm:text-sm uppercase text-center mb-5">
          VALUE FOR MONEY - UPTO 35% OFF
        </h2>

        {/* 2-Column Mobile Product Cards Grid matching screenshots 1, 2, 3, 4, 5 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {PRODUCTS.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(p) => onAddToCart(p, 1)}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* ==========================================
          SECTION 5: FROM THE BLOG (Screenshot 1)
         ========================================== */}
      <section className="max-w-7xl mx-auto px-4 py-6 border-t border-stone-200">
        <h2 className="text-stone-700 font-bold tracking-widest text-xs sm:text-sm uppercase text-center mb-6">
          From The Blog
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="h-56 bg-stone-100 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80"
                alt="Prepare for Monsoon Gardening"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 text-center space-y-2">
              <h3 className="font-bold text-base text-stone-900">
                That's How You Should Prepare For Monsoon Gardening
              </h3>
              <Link to="/care-guide" className="inline-flex items-center gap-1 text-xs font-bold text-[#FF5252] hover:underline">
                Read now <ChevronRight size={14} />
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
            <div className="h-56 bg-stone-100 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80"
                alt="Parijat Tree"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 text-center space-y-2">
              <h3 className="font-bold text-base text-stone-900">
                Why PM Modi Gifted Parijat Tree in Ayodhya
              </h3>
              <Link to="/care-guide" className="inline-flex items-center gap-1 text-xs font-bold text-[#FF5252] hover:underline">
                Read now <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/care-guide" className="inline-flex items-center gap-1 text-xs font-bold text-[#FF5252] hover:underline">
            See more <ChevronRight size={14} />
          </Link>
        </div>
      </section>

      {/* FLOATING ACTION BUTTONS */}
      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-3 z-40 bg-[#FF5252] text-white text-[11px] font-bold px-2.5 py-1.5 rounded-md shadow-lg flex items-center justify-center hover:bg-[#e04343] transition cursor-pointer"
        aria-label="Scroll to top"
      >
        Top
      </button>

      {/* QUICK VIEW MODAL */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={onAddToCart}
      />
    </div>
  );
};

