import React, { useState } from 'react';
import { Tag, Sparkles, Copy, Check, Clock, Gift, Percent, ArrowRight, ShieldCheck, ShoppingBag } from 'lucide-react';
import { useFirestore } from '../context/FirestoreContext';
import { Link } from 'react-router-dom';

export const OffersPage: React.FC = () => {
  const { offers, coupons, isLoading, error } = useFirestore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16">
      {/* HERO BANNER */}
      <section className="bg-gradient-to-r from-[#1E3A20] via-[#2F5233] to-[#172D19] text-white py-12 px-4">
        <div className="max-w-6xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-[#E8862E] text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            <Gift size={14} /> Exclusive Nursery Deals
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-amber-50">
            Special Offers & Coupon Discounts
          </h1>
          <p className="text-stone-200 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Apply active nursery promo codes at checkout to enjoy discounts on grafted fruit trees, rooftop combos, and free courier shipping.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* ERROR STATE */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-xs sm:text-sm text-red-800 font-medium">
            <strong>Firestore Error:</strong> {error}. Reconnecting real-time coupon updates...
          </div>
        )}

        {/* PROMOTIONAL BANNERS SECTION */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-200 pb-3">
            <h2 className="text-xl font-serif font-black text-[#2F5233] flex items-center gap-2">
              <Sparkles size={20} className="text-[#E8862E]" /> Live Season Offers
            </h2>
            <span className="text-xs text-stone-500 font-medium">Real-time updated from Nursery Desk</span>
          </div>

          {isLoading && offers.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
              {[1, 2, 3].map((n) => (
                <div key={n} className="bg-white rounded-3xl border border-stone-200 p-5 space-y-3">
                  <div className="h-40 bg-stone-200 rounded-2xl w-full" />
                  <div className="h-4 bg-stone-200 rounded w-1/2" />
                  <div className="h-8 bg-stone-100 rounded w-full" />
                </div>
              ))}
            </div>
          ) : offers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between"
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={offer.imageUrl}
                      alt={offer.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute top-3 left-3 bg-[#E8862E] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {offer.badge}
                    </span>
                    {offer.discountTag && (
                      <span className="absolute bottom-3 right-3 bg-white text-[#2F5233] text-xs font-black px-3 py-1 rounded-full shadow-md font-mono">
                        {offer.discountTag}
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <h3 className="font-serif font-bold text-stone-900 text-base leading-snug">
                        {offer.title}
                      </h3>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        {offer.subtitle}
                      </p>
                    </div>

                    {offer.code && (
                      <div className="pt-2 flex items-center justify-between gap-2 border-t border-stone-100">
                        <span className="text-[11px] font-mono font-black text-[#2F5233] bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                          Code: {offer.code}
                        </span>
                        <button
                          onClick={() => handleCopy(offer.code!)}
                          className="px-3 py-1.5 bg-[#2F5233] hover:bg-[#1E3A20] text-white text-xs font-bold rounded-lg transition flex items-center gap-1 cursor-pointer"
                        >
                          {copiedCode === offer.code ? <Check size={12} /> : <Copy size={12} />}
                          <span>{copiedCode === offer.code ? 'Copied!' : 'Copy Code'}</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-stone-200 text-center text-stone-500 text-xs font-medium">
              No seasonal promotional banners active currently.
            </div>
          )}
        </section>

        {/* ACTIVE COUPONS SECTION */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-200 pb-3">
            <div>
              <h2 className="text-xl font-serif font-black text-[#2F5233] flex items-center gap-2">
                <Tag size={20} className="text-emerald-700" /> Active Promo Coupons ({coupons.filter(c => c.isActive).length})
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Copy code and paste during cart checkout to claim instant discounts.
              </p>
            </div>
            <Link
              to="/shop"
              className="text-xs font-bold text-[#E8862E] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Explore Shop Catalog</span> <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.filter(c => c.isActive).map((coupon) => (
              <div
                key={coupon.id}
                className="bg-white rounded-3xl border-2 border-dashed border-emerald-300 p-5 shadow-2xs space-y-4 hover:border-emerald-500 transition"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <span className="font-mono font-black text-base text-[#2F5233] bg-emerald-100/80 px-3 py-1 rounded-xl tracking-wider inline-block">
                      {coupon.code}
                    </span>
                    <p className="text-xs font-bold text-stone-800 leading-snug pt-1">
                      {coupon.description}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xl font-black text-[#E8862E] font-mono block">
                      {coupon.discountType === 'percentage' ? `${coupon.discountValue}%` : `₹${coupon.discountValue}`}
                    </span>
                    <span className="text-[10px] text-stone-400 font-bold uppercase">OFF</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-stone-500 pt-2 border-t border-stone-100">
                  <div className="flex items-center justify-between text-[11px]">
                    <span>Min Order Value:</span>
                    <strong className="text-stone-800 font-mono">₹{coupon.minOrderValue}</strong>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-amber-500" /> Valid Until:
                    </span>
                    <strong className="text-stone-800">{coupon.expiryDate}</strong>
                  </div>
                </div>

                <button
                  onClick={() => handleCopy(coupon.code)}
                  className="w-full py-2.5 bg-[#2F5233] hover:bg-[#1E3A20] text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copiedCode === coupon.code ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span>Code Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Promo Code</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
