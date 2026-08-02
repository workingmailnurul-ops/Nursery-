import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Search,
  Truck,
  CheckCircle2,
  Clock,
  PackageCheck,
  MapPin,
  Calendar,
  CreditCard,
  Phone,
  ShieldCheck,
  Info,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Droplets,
  Sun,
  FileText,
} from 'lucide-react';
import { PlacedOrder } from '../types';
import { Button } from '../components/Button';

// Fallback demo mock orders for guest search testing
const DEMO_GUEST_ORDERS: Record<string, PlacedOrder> = {
  'AMT-2026-837192': {
    orderId: 'AMT-2026-837192',
    createdAt: 'July 23, 2026 at 11:30 AM',
    items: [
      {
        id: 'prod-1',
        name: 'Ratnagiri Alphonso Grafted Mango Tree',
        image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=400&q=80',
        category: 'mango',
        potSize: '12-inch Nursery Grow Bag',
        age: '2 Year Grafted (Fruiting Ready)',
        quantity: 2,
        unitPrice: 350,
        lineTotal: 700,
      },
      {
        id: 'prod-2',
        name: 'L-49 Sardar Lucknowi Guava Plant',
        image: 'https://images.unsplash.com/photo-1536511157201-5222b3a67231?auto=format&fit=crop&w=400&q=80',
        category: 'guava',
        potSize: '10-inch Nursery Soil Bag',
        age: '1.5 Year Grafted',
        quantity: 1,
        unitPrice: 280,
        lineTotal: 280,
      },
    ],
    deliveryDetails: {
      name: 'Anisur Rahman',
      phone: '+91 98765 43210',
      email: 'anisur.gardens@gmail.com',
      address: 'Flat 3B, Lake Garden Apartments, Southern Avenue',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700045',
    },
    orderType: 'Retail',
    paymentMethod: 'cod',
    subtotal: 980,
    deliveryFee: 0,
    discount: 98,
    total: 882,
    status: 'Shipped',
    courierName: 'Delhivery Express Live Plant Transport',
    trackingNumber: 'DT-89301294',
    estimatedDeliveryDate: 'Tomorrow, 5:00 PM',
  },
  'AMT-2026-541290': {
    orderId: 'AMT-2026-541290',
    createdAt: 'July 18, 2026 at 04:15 PM',
    items: [
      {
        id: 'combo-1',
        name: 'Rooftop Sweet Fruit Orchard Trio',
        image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80',
        category: 'combo',
        potSize: '12-inch Heavy Crate',
        age: '2 Year Grafted Set',
        quantity: 1,
        unitPrice: 890,
        lineTotal: 890,
      },
    ],
    deliveryDetails: {
      name: 'Priya Sharma',
      phone: '+91 98123 45678',
      email: 'priya.plants@gmail.com',
      address: 'Plot 42, Green Park Extension',
      city: 'New Delhi',
      state: 'Delhi NCR',
      pincode: '110016',
    },
    orderType: 'Retail',
    paymentMethod: 'upi',
    subtotal: 890,
    deliveryFee: 99,
    discount: 0,
    total: 989,
    status: 'Delivered',
    courierName: 'India Post Speed Post',
    trackingNumber: 'SP-99128301',
    estimatedDeliveryDate: 'Delivered safely on July 20',
  },
  'AMT-2026-102938': {
    orderId: 'AMT-2026-102938',
    createdAt: 'July 25, 2026 at 09:10 AM',
    items: [
      {
        id: 'prod-3',
        name: 'Nagpur Sweet Orange (Santra) Plant',
        image: 'https://images.unsplash.com/photo-1534531141161-e416040523f2?auto=format&fit=crop&w=400&q=80',
        category: 'citrus',
        potSize: '10-inch Soil Bag',
        age: '1 Year Grafted',
        quantity: 3,
        unitPrice: 320,
        lineTotal: 960,
      },
    ],
    deliveryDetails: {
      name: 'Vikram Rao',
      phone: '+91 94321 09876',
      email: 'vikram.rao@yahoo.com',
      address: 'House No 12-4/A, Jubilee Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      pincode: '500033',
    },
    orderType: 'Retail',
    paymentMethod: 'bank_transfer',
    subtotal: 960,
    deliveryFee: 0,
    discount: 0,
    total: 960,
    status: 'Confirmed',
    courierName: 'Blue Dart Express',
    trackingNumber: 'BD-3049182',
    estimatedDeliveryDate: 'Expected July 28',
  },
};

export const TrackOrderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const [inputOrderId, setInputOrderId] = useState(initialId);
  const [searchedOrder, setSearchedOrder] = useState<PlacedOrder | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  // Search logic
  const performSearch = (idToSearch: string) => {
    const cleanId = idToSearch.trim().toUpperCase();
    if (!cleanId) return;

    setHasSearched(true);

    // 1. First check localStorage orders array
    try {
      const stored = localStorage.getItem('green_heaven_placed_orders') || localStorage.getItem('amtola_placed_orders');
      if (stored) {
        const orders: PlacedOrder[] = JSON.parse(stored);
        const found = orders.find((o) => o.orderId.toUpperCase() === cleanId);
        if (found) {
          setSearchedOrder(found);
          return;
        }
      }
    } catch (e) {
      console.error(e);
    }

    // 2. Fallback to demo mock dictionary
    if (DEMO_GUEST_ORDERS[cleanId]) {
      setSearchedOrder(DEMO_GUEST_ORDERS[cleanId]);
    } else {
      setSearchedOrder(null);
    }
  };

  useEffect(() => {
    if (initialId) {
      setInputOrderId(initialId);
      performSearch(initialId);
    }
  }, [initialId]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(inputOrderId);
  };

  // Status mapping to step index (1-based)
  const getStepIndex = (status?: string) => {
    const s = (status || 'Placed').toLowerCase();
    if (s.includes('delivered')) return 4;
    if (s.includes('shipped') || s.includes('dispatch')) return 3;
    if (s.includes('confirm') || s.includes('stock') || s.includes('pack')) return 2;
    return 1;
  };

  const activeStep = searchedOrder ? getStepIndex(searchedOrder.status) : 1;

  return (
    <div className="bg-[#FAF7F2] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* BREADCRUMB */}
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Link to="/" className="hover:text-[#2F5233]">Home</Link>
          <span>/</span>
          <Link to="/orders" className="hover:text-[#2F5233]">My Orders</Link>
          <span>/</span>
          <span className="text-stone-800 font-bold">Track Shipment</span>
        </div>

        {/* SEARCH HEADER CARD */}
        <div className="bg-[#2F5233] text-stone-100 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
          <div className="space-y-2 text-center sm:text-left">
            <span className="bg-[#E8862E] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
              <Truck size={12} /> Live Plant Logistics Tracking
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Track Your Plant Order
            </h1>
            <p className="text-stone-300 text-xs sm:text-sm max-w-xl">
              Enter your Order Reference ID (e.g. AMT-2026-837192) to inspect real-time courier status and root hydration progress.
            </p>
          </div>

          {/* SEARCH FORM */}
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-2 max-w-2xl">
            <div className="relative w-full">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. AMT-2026-837192)..."
                value={inputOrderId}
                onChange={(e) => setInputOrderId(e.target.value)}
                className="w-full bg-white text-stone-800 font-mono font-bold placeholder:font-sans placeholder:font-normal rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#E8862E]"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#E8862E] hover:bg-[#d47824] text-white font-bold text-sm px-6 py-3 rounded-xl transition shrink-0 flex items-center justify-center gap-2 shadow-xs cursor-pointer"
            >
              <Truck size={16} />
              <span>Track Order</span>
            </button>
          </form>

          {/* QUICK DEMO SEARCH CHIPS */}
          <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-stone-300">
            <span className="font-semibold text-stone-400">Sample Order IDs:</span>
            {['AMT-2026-837192', 'AMT-2026-541290', 'AMT-2026-102938'].map((sampleId) => (
              <button
                key={sampleId}
                type="button"
                onClick={() => {
                  setInputOrderId(sampleId);
                  performSearch(sampleId);
                }}
                className="bg-[#244128] hover:bg-emerald-900 text-amber-300 border border-emerald-700/80 font-mono text-[11px] font-bold px-2.5 py-1 rounded-lg transition"
              >
                #{sampleId}
              </button>
            ))}
          </div>
        </div>

        {/* RESULT SECTION */}
        {hasSearched && !searchedOrder && (
          <div className="bg-white rounded-3xl p-8 sm:p-10 border border-stone-200/90 shadow-xs text-center space-y-4">
            <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto">
              <AlertCircle size={28} />
            </div>
            <div className="max-w-md mx-auto space-y-1">
              <h2 className="text-lg font-bold text-stone-800">No Order Found matching "{inputOrderId}"</h2>
              <p className="text-xs text-stone-600 leading-relaxed">
                Please double check the Order ID from your confirmation screen or SMS (format: <strong>AMT-2026-XXXXXX</strong>).
              </p>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setInputOrderId('AMT-2026-837192');
                  performSearch('AMT-2026-837192');
                }}
                className="bg-[#2F5233] text-white hover:bg-[#244128] font-bold text-xs px-4 py-2.5 rounded-xl transition flex items-center gap-1.5"
              >
                <Sparkles size={14} className="text-[#E8862E]" /> Try Demo Shipped Order #AMT-2026-837192
              </button>

              <Link
                to="/orders"
                className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs px-4 py-2.5 rounded-xl border border-stone-300 transition"
              >
                View My Orders History
              </Link>
            </div>
          </div>
        )}

        {searchedOrder && (
          <div className="space-y-6">
            {/* 1. TIMELINE TRACKING STEPPER CARD */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-6">
              {/* Top Summary Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-lg text-[#2F5233]">
                      #{searchedOrder.orderId}
                    </span>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-300 uppercase">
                      {searchedOrder.status}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 font-medium mt-1">
                    Order Placed on: {searchedOrder.createdAt}
                  </p>
                </div>

                <div className="bg-[#FAF7F2] p-3 rounded-2xl border border-stone-200 text-xs space-y-1 sm:text-right">
                  <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block">
                    Estimated Delivery
                  </span>
                  <span className="font-bold text-[#2F5233] text-sm flex items-center sm:justify-end gap-1">
                    <Clock size={14} className="text-[#E8862E]" />
                    {searchedOrder.estimatedDeliveryDate || '2-4 Business Days'}
                  </span>
                </div>
              </div>

              {/* LIVE STEPPER PROGRESS BAR */}
              <div className="space-y-3">
                <h3 className="font-serif font-bold text-sm text-[#2F5233]">
                  Shipment Progress Timeline
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {/* Step 1: Placed */}
                  <div
                    className={`p-4 rounded-2xl border space-y-2 text-xs transition ${
                      activeStep >= 1
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                        : 'bg-stone-50 border-stone-200 text-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-[10px]">
                        ✓
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">Step 1</span>
                    </div>
                    <h4 className="font-bold text-sm">Order Placed</h4>
                    <p className="text-[11px] text-stone-600 leading-snug">
                      Received in nursery system & queued for scion check.
                    </p>
                  </div>

                  {/* Step 2: Confirmed & Scion Checked */}
                  <div
                    className={`p-4 rounded-2xl border space-y-2 text-xs transition ${
                      activeStep >= 2
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                        : 'bg-stone-50 border-stone-200 text-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-[10px] ${
                          activeStep >= 2 ? 'bg-emerald-600 text-white' : 'bg-stone-300 text-stone-600'
                        }`}
                      >
                        {activeStep >= 2 ? '✓' : '2'}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">Step 2</span>
                    </div>
                    <h4 className="font-bold text-sm">Graft & Scion Verified</h4>
                    <p className="text-[11px] text-stone-600 leading-snug">
                      Nursery horticulturist inspected graft joint and root vigor.
                    </p>
                  </div>

                  {/* Step 3: Moist Root Packing & Dispatched */}
                  <div
                    className={`p-4 rounded-2xl border space-y-2 text-xs transition ${
                      activeStep >= 3
                        ? 'bg-purple-50/90 border-purple-300 text-purple-950'
                        : 'bg-stone-50 border-stone-200 text-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-[10px] ${
                          activeStep >= 3 ? 'bg-purple-700 text-white' : 'bg-stone-300 text-stone-600'
                        }`}
                      >
                        {activeStep >= 3 ? '✓' : '3'}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">Step 3</span>
                    </div>
                    <h4 className="font-bold text-sm">Moist Root Shipped</h4>
                    <p className="text-[11px] text-stone-600 leading-snug">
                      Sealed in ventilated crate with coco-peat & dispatched.
                    </p>
                  </div>

                  {/* Step 4: Delivered */}
                  <div
                    className={`p-4 rounded-2xl border space-y-2 text-xs transition ${
                      activeStep >= 4
                        ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                        : 'bg-stone-50 border-stone-200 text-stone-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`w-6 h-6 rounded-full font-bold flex items-center justify-center text-[10px] ${
                          activeStep >= 4 ? 'bg-emerald-600 text-white' : 'bg-stone-300 text-stone-600'
                        }`}
                      >
                        {activeStep >= 4 ? '✓' : '4'}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">Step 4</span>
                    </div>
                    <h4 className="font-bold text-sm">Delivered to Doorstep</h4>
                    <p className="text-[11px] text-stone-600 leading-snug">
                      Handed over safely to plant owner.
                    </p>
                  </div>
                </div>
              </div>

              {/* COURIER & LOGISTICS DETAILS */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-stone-200/90 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#2F5233] font-bold">
                  <ShieldCheck size={16} className="text-[#E8862E]" /> Logistics Partner & Live AWB Details
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 text-stone-700">
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Courier Name</span>
                    <strong className="text-stone-800">{searchedOrder.courierName || 'Delhivery Express Courier'}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">AWB / Tracking Number</span>
                    <strong className="font-mono text-[#2F5233]">{searchedOrder.trackingNumber || 'DT-89301294'}</strong>
                  </div>
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Packaging Standard</span>
                    <strong className="text-emerald-800">Wooden Frame Crate + Coco-Peat Gel</strong>
                  </div>
                </div>
              </div>

              {/* UNBOXING CARE TIP ALERT */}
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-300/80 flex items-start gap-3 text-amber-900 text-xs">
                <Droplets size={20} className="text-[#E8862E] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <strong className="font-bold block text-sm text-[#2F5233]">
                    Important Live Plant Unboxing Advice:
                  </strong>
                  <p className="text-stone-700 leading-relaxed">
                    Your grafted fruit tree is traveling in moisture-locked root packaging. Upon delivery, unwrap the box carefully, place the sapling in partial shade for 48 hours, and water thoroughly. Do not expose to direct harsh noon sunlight immediately.
                  </p>
                </div>
              </div>
            </div>

            {/* 2. ITEM LIST & ADDRESS SUMMARY */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left 2 Cols: Itemized Plants */}
              <div className="md:col-span-2 bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-4">
                <h3 className="font-serif font-bold text-base text-[#2F5233]">
                  Ordered Plants ({searchedOrder.items.length})
                </h3>
                <div className="divide-y divide-stone-100 text-xs">
                  {searchedOrder.items.map((item, idx) => (
                    <div key={idx} className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-2xl object-cover border border-stone-200 shrink-0"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                        <div className="space-y-0.5">
                          <h4 className="font-bold text-stone-800 text-sm">{item.name}</h4>
                          <p className="text-stone-500 text-[11px]">
                            {item.potSize} • {item.age}
                          </p>
                          <span className="text-emerald-800 font-semibold text-[10px] bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 inline-block">
                            Grafted Mother-Plant Scion Verified
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="font-bold text-[#2F5233] text-sm block">
                          ₹{item.lineTotal.toLocaleString()}
                        </span>
                        <span className="text-stone-500 text-[11px]">Qty: {item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Col: Address & Payment Summary */}
              <div className="bg-white rounded-3xl p-6 border border-stone-200/90 shadow-xs space-y-4 text-xs">
                <h3 className="font-serif font-bold text-base text-[#2F5233]">
                  Delivery & Payment
                </h3>

                <div className="space-y-3">
                  <div className="space-y-1 border-b border-stone-100 pb-3">
                    <span className="text-stone-400 font-bold uppercase text-[10px] block">Shipping Destination</span>
                    <p className="font-bold text-stone-800 text-sm">{searchedOrder.deliveryDetails.name}</p>
                    <p className="text-stone-600">{searchedOrder.deliveryDetails.address}</p>
                    <p className="text-stone-600">
                      {searchedOrder.deliveryDetails.city}, {searchedOrder.deliveryDetails.state} -{' '}
                      <strong>{searchedOrder.deliveryDetails.pincode}</strong>
                    </p>
                    <p className="text-stone-700 font-semibold pt-1">Phone: {searchedOrder.deliveryDetails.phone}</p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-stone-400 font-bold uppercase text-[10px] block">Payment Method</span>
                    <span className="font-bold text-stone-800 text-sm block capitalize">
                      {searchedOrder.paymentMethod === 'cod'
                        ? 'Cash on Delivery (COD)'
                        : searchedOrder.paymentMethod.toUpperCase()}
                    </span>
                    <span className="text-stone-500 text-[11px] block">
                      Total Order Price: <strong>₹{searchedOrder.total.toLocaleString()}</strong>
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
                  <a
                    href="https://wa.me/918011253258"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-3 rounded-xl transition text-center flex items-center justify-center gap-2"
                  >
                    Need Help? Contact Nursery (+91 8011253258)
                  </a>

                  <Link
                    to="/orders"
                    className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold py-2 px-3 rounded-xl transition text-center flex items-center justify-center gap-1"
                  >
                    <FileText size={14} /> Back to My Orders
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
