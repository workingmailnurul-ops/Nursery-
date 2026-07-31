import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Check, ShieldCheck, Clock } from 'lucide-react';
import { Product } from '../types';
import { useWishlist } from '../context/WishlistContext';
import { Card } from './Card';
import { Badge } from './Badge';
import { RatingStars } from './RatingStars';
import { PriceTag } from './PriceTag';
import { Button } from './Button';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
}) => {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);
  const [addedToast, setAddedToast] = useState(false);

  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
    }, 1800);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <Card hoverEffect={true} className="flex flex-col h-full group relative overflow-hidden bg-white border border-stone-200/80 rounded-lg shadow-2xs">
      {/* Product Image Area */}
      <div className="relative w-full aspect-square bg-[#F5F5F5] overflow-hidden flex items-center justify-center p-2">
        <Link to={`/product/${product.id}`} className="w-full h-full block">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80';
            }}
          />
        </Link>

        {/* Top-Right Red SALE Badge matching screenshot */}
        <div className="absolute top-2 right-2 z-10 pointer-events-none">
          <span className="bg-[#FF5252] text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-2xs shadow-xs tracking-wider">
            SALE
          </span>
        </div>

        {/* Wishlist Floating Button */}
        <div className="absolute top-2 left-2 z-10">
          <button
            onClick={handleWishlistClick}
            className={`p-1.5 rounded-full backdrop-blur-md transition-all ${
              isWishlisted
                ? 'bg-[#FF5252] text-white'
                : 'bg-white/80 text-stone-600 hover:bg-white hover:text-[#FF5252]'
            }`}
            aria-label="Wishlist"
          >
            <Heart size={14} className={isWishlisted ? 'fill-white' : ''} />
          </button>
        </div>
      </div>

      {/* Product Info Body */}
      <div className="p-3 flex flex-col flex-1 justify-between space-y-2">
        <div className="space-y-1">
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="font-sans font-semibold text-xs sm:text-sm text-stone-900 group-hover:text-[#FF5252] transition-colors leading-snug line-clamp-2">
              {product.name}
            </h3>
          </Link>

          {/* Rating Stars with review count in parentheses */}
          <div className="flex items-center gap-1 pt-0.5">
            <RatingStars rating={product.rating} count={product.reviewCount} size={13} />
          </div>
        </div>

        {/* Price Tag & Add to Cart */}
        <div className="pt-1.5 border-t border-stone-100 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-[#FF5252] font-extrabold text-sm sm:text-base">
              ₹ {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-stone-400 text-xs line-through font-normal">
                ₹ {product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCartClick}
            className={`text-xs font-bold px-2.5 py-1.5 rounded-md transition-all flex items-center gap-1 cursor-pointer ${
              addedToast
                ? 'bg-emerald-600 text-white'
                : 'bg-[#FF5252] hover:bg-[#e04343] text-white'
            }`}
            title="Add to Cart"
          >
            {addedToast ? <Check size={14} /> : <ShoppingCart size={14} />}
          </button>
        </div>
      </div>
    </Card>
  );
};
