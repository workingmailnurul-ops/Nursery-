import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowLeft, Sprout, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import { PRODUCTS } from '../data/products';

export const WishlistPage: React.FC = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveAllToCart = () => {
    wishlistItems.forEach((item) => {
      addToCart(item);
    });
  };

  // Recommended products for discovery
  const recommendedProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-6 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-stone-500 font-medium">
          <Link to="/" className="hover:text-[#2A8A3C] transition">
            Home
          </Link>
          <ChevronRight size={12} />
          <span className="text-stone-800 font-bold">My Wishlist</span>
        </nav>

        {/* Page Header Banner */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-[#FF5252]/10 text-[#FF5252] flex items-center justify-center font-bold">
                <Heart size={22} className="fill-[#FF5252]" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#2F5233]">
                  My Plant Wishlist
                </h1>
                <p className="text-xs text-stone-500">
                  Save your favorite grafted fruit trees & indoor plants for future garden planning.
                </p>
              </div>
            </div>
          </div>

          {wishlistItems.length > 0 && (
            <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
              <Button
                variant="accent"
                size="md"
                onClick={handleMoveAllToCart}
                leftIcon={<ShoppingBag size={16} />}
              >
                Add All to Cart ({wishlistItems.length})
              </Button>
              <button
                onClick={clearWishlist}
                className="px-3 py-2 rounded-xl border border-stone-200 text-stone-600 hover:text-red-600 hover:bg-red-50 hover:border-red-200 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 size={14} /> Clear All
              </button>
            </div>
          )}
        </div>

        {/* Wishlist Items Content */}
        {wishlistItems.length === 0 ? (
          /* Empty Wishlist State */
          <div className="bg-white rounded-3xl p-10 sm:p-16 border border-stone-200 text-center space-y-5 max-w-2xl mx-auto shadow-2xs">
            <div className="w-20 h-20 bg-rose-50 rounded-full text-rose-500 flex items-center justify-center mx-auto shadow-inner">
              <Heart size={38} className="fill-rose-100 stroke-rose-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-serif font-extrabold text-[#2F5233]">
                Your Wishlist is Empty
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 leading-relaxed max-w-md mx-auto">
                You haven't saved any plants yet. Tap the heart icon on any plant card to save your favorite saplings and accessories!
              </p>
            </div>
            <div className="pt-2">
              <Link to="/shop">
                <Button variant="primary" size="lg" leftIcon={<Sprout size={18} />}>
                  Explore Fruit Plants & Saplings
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          /* Wishlist Grid */
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs font-extrabold text-stone-700 uppercase tracking-wider">
              <span>Saved Items ({wishlistItems.length})</span>
              <span className="text-emerald-700 flex items-center gap-1 normal-case font-bold">
                <CheckCircle2 size={14} className="text-emerald-600" /> Stored safely in browser storage
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {wishlistItems.map((product) => (
                <div key={product.id} className="relative group">
                  <ProductCard product={product} onAddToCart={addToCart} />
                  {/* Remove Floating Button */}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2 right-12 z-20 p-1.5 bg-stone-900/80 text-white hover:bg-red-600 rounded-full backdrop-blur-md transition-all shadow-xs cursor-pointer"
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Discovery & Recommendations Section */}
        <div className="pt-8 space-y-4 border-t border-stone-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif font-bold text-[#2F5233] flex items-center gap-2">
                <Sparkles size={18} className="text-[#E8862E]" /> Recommended High-Yield Saplings
              </h2>
              <p className="text-xs text-stone-500">Popular varieties trending this planting season</p>
            </div>
            <Link to="/shop" className="text-xs font-bold text-[#2A8A3C] hover:underline flex items-center gap-1">
              View Shop <ChevronRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recommendedProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
