import React, { useState } from 'react';
import { X, ShoppingCart, ShieldCheck, Clock, Sprout, CheckCircle2, PhoneCall, Truck, Leaf } from 'lucide-react';
import { Product } from '../types';
import { Button } from './Button';
import { Badge } from './Badge';
import { RatingStars } from './RatingStars';
import { PriceTag } from './PriceTag';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl shadow-2xl border border-stone-200 max-w-2xl w-full p-6 z-10 space-y-5 animate-in zoom-in-95 duration-200 overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-full transition z-10"
        >
          <X size={20} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Plant Image & Badges */}
          <div className="space-y-3">
            <div className="relative h-64 sm:h-72 bg-[#FAF7F2] rounded-2xl overflow-hidden border border-stone-200 flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="absolute top-3 left-3 flex flex-col gap-1">
                {product.badgeText && <Badge variant="discount">{product.badgeText}</Badge>}
                <span className="bg-[#2F5233] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg">
                  🌱 Genuine Scion
                </span>
              </div>
            </div>

            {/* Quick Specs Grid */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-stone-200">
                <span className="text-stone-400 font-medium block text-[10px]">Graft Technique</span>
                <span className="font-bold text-[#2F5233]">{product.graftType}</span>
              </div>
              <div className="bg-[#FAF7F2] p-2.5 rounded-xl border border-stone-200">
                <span className="text-stone-400 font-medium block text-[10px]">Expected Fruiting</span>
                <span className="font-bold text-[#E8862E]">{product.fruitingTime}</span>
              </div>
            </div>
          </div>

          {/* Plant Details & Ordering */}
          <div className="space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-bold text-[#E8862E] uppercase tracking-wider">
                {product.category} Sapling
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#2F5233]">
                {product.name}
              </h2>
              {product.scientificName && (
                <p className="text-xs italic text-stone-500">{product.scientificName}</p>
              )}

              <div className="py-1">
                <RatingStars rating={product.rating} count={product.reviewCount} size={16} />
              </div>

              <PriceTag price={product.price} originalPrice={product.originalPrice} size="lg" />

              <p className="text-xs text-stone-600 leading-relaxed pt-1">
                {product.description} Cultivated at Talukdar Nursery with moisture-locked packaging for courier delivery.
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-stone-100">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-stone-700">Quantity:</span>
                <div className="flex items-center border border-stone-300 rounded-xl overflow-hidden bg-[#FAF7F2]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-[#2F5233] bg-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-1.5 text-stone-600 hover:bg-stone-200 font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                variant={added ? 'primary' : 'accent'}
                size="lg"
                fullWidth
                onClick={handleAdd}
                leftIcon={<ShoppingCart size={18} />}
              >
                {added ? 'Added to Cart!' : `Add ${quantity} to Cart (₹${(product.price * quantity).toLocaleString()})`}
              </Button>

              <div className="pt-2 flex items-center justify-between text-[11px] text-stone-500">
                <span className="flex items-center gap-1 font-medium text-emerald-800">
                  <ShieldCheck size={14} className="text-emerald-600" /> 100% Replacement Guarantee
                </span>
                <a href="tel:+917002765701" className="flex items-center gap-1 font-bold text-[#2F5233] hover:underline">
                  <PhoneCall size={12} className="text-[#E8862E]" /> Ask Expert (+91 70027 65701)
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
