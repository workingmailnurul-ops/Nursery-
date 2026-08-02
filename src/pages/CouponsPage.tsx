import React, { useState } from 'react';
import { Tag, Copy, Check, Clock, ShieldCheck, Sparkles, Gift } from 'lucide-react';
import { useFirestore } from '../context/FirestoreContext';

export const CouponsPage: React.FC = () => {
  const { coupons } = useFirestore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16">
      <section className="bg-gradient-to-r from-[#172D19] to-[#2F5233] text-white py-12 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-[#E8862E] text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-xs">
            <Tag size={14} /> Official Voucher Codes
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-amber-50">
            Nursery Promotional Coupons
          </h1>
          <p className="text-stone-200 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Copy and apply any active voucher code during checkout for instant savings on your plant orders.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coupons.map((c) => (
            <div
              key={c.id}
              className={`bg-white rounded-3xl border-2 p-6 shadow-2xs space-y-4 flex flex-col justify-between transition-all ${
                c.isActive ? 'border-emerald-300 hover:border-emerald-500' : 'border-stone-200 opacity-60'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-black text-base text-[#2F5233] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl tracking-wider">
                    {c.code}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
                    {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} OFF`}
                  </span>
                </div>

                <p className="text-xs font-medium text-stone-700 leading-snug">
                  {c.description}
                </p>

                <div className="space-y-1 text-[11px] text-stone-500 bg-[#FAF7F2] p-3 rounded-xl">
                  <div className="flex justify-between">
                    <span>Minimum Purchase:</span>
                    <strong className="text-stone-800 font-mono">₹{c.minOrderValue}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Valid Expiry:</span>
                    <strong className="text-stone-800">{c.expiryDate}</strong>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleCopy(c.code)}
                disabled={!c.isActive}
                className="w-full py-2.5 bg-[#2F5233] hover:bg-[#1E3A20] text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {copiedCode === c.code ? (
                  <>
                    <Check size={14} className="text-emerald-400" />
                    <span>Coupon Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>Copy Voucher Code</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
