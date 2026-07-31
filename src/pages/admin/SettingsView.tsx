import React, { useState } from 'react';
import { Settings, Save, CheckCircle2, Shield, Truck, CreditCard, Building, Bell } from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [savedSuccess, setSavedSuccess] = useState(false);

  const [settings, setSettings] = useState({
    nurseryName: 'Talukdar Nursery',
    tagline: '100% Genuine Mother-Plant Grafted Fruit Trees & Indoor Plants',
    phone: '+91 70027 65701',
    supportEmail: 'support@talukdarnursery.com',
    address: 'Hockey Stadium Rd, Nalapara, Sarusajai, Guwahati, Assam 781040',
    insideDhakaFee: 60,
    outsideDhakaFee: 120,
    freeDeliveryThreshold: 1500,
    enableCOD: true,
    enableMFS: true,
    enableCard: true,
    stockAlertThreshold: 5,
    emailNotifications: true,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('green_heaven_nursery_settings_v1', JSON.stringify(settings));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-serif font-black text-[#2F5233] flex items-center gap-2">
            <Settings size={22} className="text-emerald-700" /> Nursery System Settings
          </h2>
          <p className="text-xs text-stone-500">
            Configure delivery fees, nursery store profile, payment modes, and notification alerts.
          </p>
        </div>

        {savedSuccess && (
          <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3.5 py-1.5 rounded-xl border border-emerald-300 flex items-center gap-1.5 animate-bounce">
            <CheckCircle2 size={15} /> Settings Saved Successfully!
          </span>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Store Profile */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
          <h3 className="text-base font-serif font-bold text-[#2F5233] flex items-center gap-2 border-b border-stone-200 pb-3">
            <Building size={18} className="text-emerald-700" /> Nursery Store Identity
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
            <div>
              <label className="block text-stone-700 mb-1">Nursery Brand Name</label>
              <input
                type="text"
                value={settings.nurseryName}
                onChange={(e) => setSettings({ ...settings, nurseryName: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-stone-700 mb-1">Support Phone</label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-stone-700 mb-1">Support Email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-stone-700 mb-1">Stock Out Warning Threshold</label>
              <input
                type="number"
                value={settings.stockAlertThreshold}
                onChange={(e) => setSettings({ ...settings, stockAlertThreshold: Number(e.target.value) })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-stone-700 mb-1">Physical Nursery Address</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Delivery Charges & Shipping Rules */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
          <h3 className="text-base font-serif font-bold text-[#2F5233] flex items-center gap-2 border-b border-stone-200 pb-3">
            <Truck size={18} className="text-emerald-700" /> Delivery Charges & Shipping Policy
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold">
            <div>
              <label className="block text-stone-700 mb-1">Local Courier Fee (₹)</label>
              <input
                type="number"
                value={settings.insideDhakaFee}
                onChange={(e) => setSettings({ ...settings, insideDhakaFee: Number(e.target.value) })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-stone-700 mb-1">National Courier Fee (₹)</label>
              <input
                type="number"
                value={settings.outsideDhakaFee}
                onChange={(e) => setSettings({ ...settings, outsideDhakaFee: Number(e.target.value) })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-stone-700 mb-1">Free Delivery Min Spend (₹)</label>
              <input
                type="number"
                value={settings.freeDeliveryThreshold}
                onChange={(e) => setSettings({ ...settings, freeDeliveryThreshold: Number(e.target.value) })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Payment Gateways */}
        <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
          <h3 className="text-base font-serif font-bold text-[#2F5233] flex items-center gap-2 border-b border-stone-200 pb-3">
            <CreditCard size={18} className="text-emerald-700" /> Payment Gateway Methods
          </h3>

          <div className="space-y-3 text-xs font-bold">
            <label className="flex items-center gap-3 p-3 bg-[#FAF7F2] rounded-2xl border border-stone-200 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableCOD}
                onChange={(e) => setSettings({ ...settings, enableCOD: e.target.checked })}
                className="w-4 h-4 accent-[#2F5233]"
              />
              <div>
                <span className="text-stone-900 block">Cash on Delivery (COD)</span>
                <span className="text-[11px] text-stone-500 font-normal">Allow customers to pay cash when saplings are delivered</span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 bg-[#FAF7F2] rounded-2xl border border-stone-200 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enableMFS}
                onChange={(e) => setSettings({ ...settings, enableMFS: e.target.checked })}
                className="w-4 h-4 accent-[#2F5233]"
              />
              <div>
                <span className="text-stone-900 block">Mobile Banking (bKash / Nagad / Rocket)</span>
                <span className="text-[11px] text-stone-500 font-normal">Enable instant mobile wallet payments at checkout</span>
              </div>
            </label>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-[#2F5233] hover:bg-[#1E3A20] text-white text-xs font-extrabold rounded-2xl shadow-md transition flex items-center gap-2 cursor-pointer"
          >
            <Save size={16} /> Save Settings Changes
          </button>
        </div>
      </form>
    </div>
  );
};
