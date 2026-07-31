import React, { useState } from 'react';
import { Tag, Plus, CheckCircle2, XCircle, Copy, Check, Trash2, Calendar, Sparkles, X } from 'lucide-react';
import { Coupon } from './adminData';

interface CouponsManagerProps {
  coupons: Coupon[];
  onAddCoupon: (c: Coupon) => void;
  onUpdateCoupon: (c: Coupon) => void;
  onDeleteCoupon: (id: string) => void;
}

export const CouponsManager: React.FC<CouponsManagerProps> = ({
  coupons,
  onAddCoupon,
  onUpdateCoupon,
  onDeleteCoupon,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    code: '',
    description: '',
    discountType: 'percentage' as 'percentage' | 'fixed',
    discountValue: 15,
    minOrderValue: 1000,
    expiryDate: '2026-12-31',
    usageLimit: 200,
  });

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code) return;

    onAddCoupon({
      id: `c-${Date.now()}`,
      code: formData.code.toUpperCase().replace(/\s+/g, ''),
      description: formData.description || `${formData.discountValue}% Off Promo Code`,
      discountType: formData.discountType,
      discountValue: Number(formData.discountValue),
      minOrderValue: Number(formData.minOrderValue),
      expiryDate: formData.expiryDate,
      usageCount: 0,
      usageLimit: Number(formData.usageLimit),
      isActive: true,
    });

    setIsModalOpen(false);
    setFormData({
      code: '',
      description: '',
      discountType: 'percentage',
      discountValue: 15,
      minOrderValue: 1000,
      expiryDate: '2026-12-31',
      usageLimit: 200,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-serif font-black text-[#2F5233] flex items-center gap-2">
            <Tag size={22} className="text-emerald-700" /> Promotional Vouchers & Coupons
          </h2>
          <p className="text-xs text-stone-500">
            Create discount codes to boost customer conversion and reward repeat nursery buyers.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2.5 bg-[#2F5233] hover:bg-[#1E3A20] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Plus size={16} /> Create Coupon Code
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {coupons.map((c) => (
          <div
            key={c.id}
            className={`bg-white rounded-3xl border p-5 shadow-2xs space-y-4 flex flex-col justify-between transition-all ${
              c.isActive ? 'border-emerald-300 hover:border-emerald-500' : 'border-stone-200 opacity-60'
            }`}
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-black text-sm text-[#2F5233] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl tracking-wider">
                    {c.code}
                  </span>
                  <button
                    onClick={() => handleCopy(c.code)}
                    className="p-1 text-stone-400 hover:text-stone-700 transition"
                    title="Copy Code"
                  >
                    {copiedCode === c.code ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                  </button>
                </div>

                <button
                  onClick={() => onUpdateCoupon({ ...c, isActive: !c.isActive })}
                  className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold transition cursor-pointer ${
                    c.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {c.isActive ? 'Active' : 'Disabled'}
                </button>
              </div>

              <p className="text-xs text-stone-700 font-medium leading-relaxed">
                {c.description}
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-stone-100 text-xs">
              <div className="flex justify-between text-stone-600 font-semibold">
                <span>Discount Offer:</span>
                <span className="font-bold text-[#2F5233]">
                  {c.discountType === 'percentage' ? `${c.discountValue}% OFF` : `₹${c.discountValue} FLAT OFF`}
                </span>
              </div>

              <div className="flex justify-between text-stone-600 font-semibold">
                <span>Min Order Spend:</span>
                <span className="font-bold text-stone-900">₹{c.minOrderValue}</span>
              </div>

              <div className="flex justify-between text-stone-600 font-semibold">
                <span>Usage Progress:</span>
                <span className="font-bold text-stone-900">
                  {c.usageCount} / {c.usageLimit} redeemed
                </span>
              </div>

              <div className="flex justify-between items-center text-stone-500 text-[11px] pt-1">
                <span className="flex items-center gap-1">
                  <Calendar size={12} /> Expires {c.expiryDate}
                </span>

                <button
                  onClick={() => onDeleteCoupon(c.id)}
                  className="p-1 text-rose-500 hover:bg-rose-50 rounded"
                  title="Delete Coupon"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE NEW COUPON MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-base font-serif font-bold text-[#2F5233]">Create Coupon Code</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs font-semibold">
              <div>
                <label className="block text-stone-700 mb-1">Coupon Promo Code *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. MONSOON25"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 uppercase font-mono"
                />
              </div>

              <div>
                <label className="block text-stone-700 mb-1">Offer Description</label>
                <input
                  type="text"
                  placeholder="e.g. 25% discount on all grafted mango saplings"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 mb-1">Discount Type</label>
                  <select
                    value={formData.discountType}
                    onChange={(e) => setFormData({ ...formData, discountType: e.target.value as any })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (₹)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 mb-1">Discount Value</label>
                  <input
                    type="number"
                    required
                    value={formData.discountValue}
                    onChange={(e) => setFormData({ ...formData, discountValue: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 mb-1">Min Order Value (₹)</label>
                  <input
                    type="number"
                    value={formData.minOrderValue}
                    onChange={(e) => setFormData({ ...formData, minOrderValue: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 mb-1">Max Redemptions</label>
                  <input
                    type="number"
                    value={formData.usageLimit}
                    onChange={(e) => setFormData({ ...formData, usageLimit: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 mb-1">Expiry Date</label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2F5233] text-white rounded-xl shadow-xs"
                >
                  Create Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
